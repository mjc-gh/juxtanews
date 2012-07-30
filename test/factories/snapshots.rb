include ActionDispatch::TestProcess

FactoryGirl.define do
  factory :snapshot do
    runtime 10.2345

    image { fixture_file_upload(Rails.root.join('test', 'fixtures', 'snapshot.png'), 'image/png') }
  end
end

