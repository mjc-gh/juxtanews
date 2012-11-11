require 'test_helper'

class SitesControllerTest < ActionController::TestCase
  setup do
    stub_paperclip!
  end

  test "home (as root)" do
    get :home

    assert_template :index
    assert_response :success
  end

  test "index json empty" do
    get :index, format: :json
    assert_response :success

    with_json_body { |json| assert json.empty? }
  end

  test "index json" do
    2.times { create :site }

    get :index, format: :json
    assert_response :success

    with_json_body { |json| assert_equal 2, json.size }
  end

  test "show json" do
    site = create :site

    get :show, id: site, format: :json
    assert_response :success

    with_json_body do |json|
      assert json.include?(:name)
      assert json.include?(:url)

      assert json.include?(:last_snapshot_id)
      assert json.include?(:last_snapshot_at)
      assert json.include?(:last_snapshot_preview)
    end
  end

  test "show not found" do
    get :show, id: 1, format: :json
    assert_response :not_found

    with_json_body { |json| assert json.include?(:error) }
  end
end
