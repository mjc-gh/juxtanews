Bundler.require(:newsie)
require 'benchmark'

class Newsie
  attr_reader :site, :snapshot, :html, :assets

  def self.fetch(site)
    new(site).tap { |newsie| newsie.send(:exec) }
  end

  def initialize(site)
    @site = site
    @started = nil
  end

  def to_s
    "#<newsie html:#{@html.bytesize} bytes>"
  end

  protected

  def exec
    return unless @html.nil?

    self.class.log "Fetching #{@site.name} (ID: #{@site.id})"
    @started = Time.now

    @html = HTTParty.get(@site.url).body
    @html.force_encoding('UTF-8')

    self.class.log "Processing #{@site.name}"
    @snapshot = @site.snapshots.build.tap do |snapshot|
      snapshot.attributes = { image: create_png, runtime: calc_runtime }
      snapshot.save

      if snapshot.persisted?
        self.class.log "Created Snapshot #{snapshot.id} for #{@site.name}"
      else
        self.class.log "Failed to Create Snapshot for #{@site.name}"
        self.class.log "Errors: #{snapshot.errors.full_messages.join(', ')}"
      end
    end
  end

  private

  def calc_runtime
    Time.now - @started if @started
  end

  def create_png
    img = IMGKit.new(@html, quality: 100)

    Tempfile.new("#{site.ident}.png").tap do |tmp|
      tmp.binmode
      tmp.write img.to_png
    end
  end

  def self.log(msg)
    Rails.logger.info "[newsie] #{msg}"
  end

  class Poller
    def initialize(args)
      @options = { daemonize: false }

      parser = OptionParser.new do |opts|
        opts.banner = 'newsie options'
        opts.on('-d', '--daemonize', 'Run as daemon') { |d| @options[:daemonize] = d }
      end

      parser.parse!(args)
    end

    def run
      #Process.daemon(true, false) if @options[:daemonize]

      trap('INT') { puts 'Exiting (INT)...'; stop }
      trap('TERM') { puts 'Exiting (TERM)...'; stop }
      loop do
        break if stop?

        sites = Site.with_stale_snapshots
        Newsie.log "Found #{sites.size} Stale Sites..."

        threads = sites.map do |site|
          Thread.new do
            bm = Benchmark.measure do
              Newsie.fetch(site)
              ActiveRecord::Base.connection.close
            end

            Newsie.log "Processed #{site.name} in #{bm.real} seconds"
          end
        end

        threads.map(&:join)
        break if stop?

        # wait a bit before polling against
        sleep Site::STALE_DELAY / 10.0
      end
    end

    def stop
      @stop = true
    end

    def stop?
      @stop
    end
  end
end
