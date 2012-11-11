source 'https://rubygems.org'

gem 'rails', '3.2.6'
gem 'rails-api'
gem 'pg'

gem 'paperclip'
gem 'aws-sdk', '~> 1.3.4'
gem 'imgkit'

group :assets do
  gem 'sass', '~> 3.2.0.alpha.93'
  gem 'compass', '~> 0.13.alpha.0'

  gem 'sass-rails'
  gem 'compass-rails'
  gem 'animate'
end

group :test, :development do
  gem 'quiet_assets'

  gem 'guard'
  gem 'guard-test'
end

group :test do
  gem 'timecop'
  gem 'factory_girl_rails'

  gem 'mocha', require: false
end

group :newsie do
  gem 'httparty'
end

# To use debugger
gem 'ruby-debug19', :require => 'ruby-debug'
