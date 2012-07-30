# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
ite
  'media' => {
    'CNN' => { url: 'http://www.cnn.com/', position: 1 },
    'FOX News' => { url: 'http://www.foxnews.com/', position: 2 },
    'NBC News' => { url: 'http://www.nbcnews.com', position: 3 }
  },

  'print' => {
    'New York Times' => { url: 'http://www.nytimes.com/', position: 4 },
    'Washington Post' => { url: 'http://www.washingtonpost.com/', position: 5 },
    'The Guardian' => { url: 'http://www.guardiannews.com/', position: 6 }
  }
}.each do |category, sites|
  sites.each do |name, hash|
    next if Site.find_by_url(hash[:url])

    site = Site.new(name: name, url: hash[:url], position: hash[:position])

    if site.save
      puts "Site Saved: #{site.name}"
    else
      puts "Site Error: #{site.errors.full_messages.join(', ')}"
    end
  end
end
