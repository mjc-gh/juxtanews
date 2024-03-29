FactoryGirl.define do
  factory :site do
    sequence(:name)  { |n| "Site #{n}" }
    sequence(:ident) { |n| "site-#{n}" }
    sequence(:url)   { |n| "http://www.site-#{n}.com/" }
  end
end

