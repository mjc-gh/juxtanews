require 'test_helper'

class SnapshotsControllerTest < ActionController::TestCase
  setup do
    @site = create :site

    stub_paperclip!
  end

  test "index json empty" do
    get :index, site_id: @site, format: :json
    assert_response :success

    with_json_body { |json| assert json.empty? }
  end

  test "index json" do
    5.times { create :snapshot, site: @site }

    get :index, site_id: @site, format: :json
    assert_response :success

    with_json_body do |json|
      assert_equal 5, json.size
      assert json.first.include?('thumbnail')
    end
  end

  test "index json with offset" do
    30.times { create :snapshot, site: @site }

    get :index, site_id: @site, offset: 20, format: :json
    assert_response :success

    with_json_body { |json| assert_equal 10, json.size }
  end

  test "show json" do
    ss = create :snapshot, site: @site

    get :show, site_id: @site, id: ss, format: :json
    assert_response :success

    with_json_body do |json|
      assert json.include?(:id)
      assert json.include?(:original)
      assert json.include?(:created_at)
    end
  end

  test "show not found" do
    get :show, site_id: @site, id: 1, format: :json
    assert_response :not_found

    with_json_body { |json| assert json.include?(:error) }
  end

  test "latest json" do
    ss = create :snapshot, site: @site

    get :latest, site_id: @site, format: :json
    assert_response :success

    with_json_body do |json|
      assert_equal ss.id, json[:id]
      assert json.include?(:original)
    end
  end
end
