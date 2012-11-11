# Our Sites...
{
  'media' => {
    'CNN' => { url: 'http://www.cnn.com/', position: 1 },
    'FOX News' => { url: 'http://www.foxnews.com/', position: 2 },
    'NBC News' => { url: 'http://www.nbcnews.com', position: 3 },
    'ABC News' => { url: 'http://abcnews.go.com/', position: 4 },
    'CBS News' => { url: 'http://www.cbsnews.com/', position: 5 }
  },

  'print' => {
    'Washington Post' => { url: 'http://www.washingtonpost.com/', position: 21 },
    'New York Times' => { url: 'http://www.nytimes.com/', position: 22 },
    'The Guardian' => { url: 'http://www.guardiannews.com/', position: 23 }
  },
# Townhall (R)
# The Nation (L)
# Red State (R)
  'web' => {
    'The Huffington Post' => { url: 'http://www.huffingtonpost.com/', position: 41 },
  }

}.each do |category, sites|
  sites.each do |name, hash|
    attrs = { name: name, url: hash[:url], category: category, position: hash[:position] }

    if site = Site.find_by_url(hash[:url])
      site.update_attributes(attrs)

      puts "Site Updated: #{site.name}"

    else
      site = Site.new(attrs)

      if site.save
        puts "Site Saved: #{site.name}"
      else
        puts "Site Error: #{site.errors.full_messages.join(', ')}"
      end
    end
  end
end
