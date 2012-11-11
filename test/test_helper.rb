ENV["RAILS_ENV"] = "test"
require File.expand_path('../../config/environment', __FILE__)
require 'rails/test_help'

class ActiveSupport::TestCase
  def stub_paperclip!
    Snapshot.any_instance.stubs(:save_attached_files).returns(true)
    Snapshot.any_instance.stubs(:destroy_attached_files).returns(true)
  end

  def setup
    stub_paperclip!
  end

  def teardown
    mocha_teardown
  end

  def with_json_body
    json = JSON.parse(response.body, symbolize_keys: true)
    json = json.with_indifferent_access if Hash === json

    yield json
  end

  include FactoryGirl::Syntax::Methods
end
