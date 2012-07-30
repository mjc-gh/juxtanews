require 'newsie'

namespace :newsie do
  desc "Start Newsie poller process"
  task :poller => :environment do
    Newsie::Poller.new(ARGV).run
  end

  desc "One-off single fetch for given Site ID"
  task :fetch => :environment do
    site = Site.find(ENV['ID'] || ENV['SITE'])

    Newsie::fetch(site)
  end
end
