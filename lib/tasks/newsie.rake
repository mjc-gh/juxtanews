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

  desc "Find by name"
  task :find => :environment do
    name = "%#{ENV['NAME']}%"

    Site.where('name ILIKE ?', name).each do |site|
      puts "Found #{site.name}"
      puts "\tid: #{site.id}"
      puts "\tident: #{site.ident}"
      puts "\turl: #{site.url}"
    end
  end
end
