require 'test_helper'

class SnapshotTest < ActiveSupport::TestCase
  test "site id required" do
    site = build :site
    ss = build :snapshot

    assert ss.invalid?
    assert ss.errors.include?(:site)
  end

  test "image required" do
    site = build :site
    ss = build :snapshot, image: nil, site: site

    assert ss.invalid?
    assert ss.errors.include?(:image)
  end

  test "snapshot sets last_snapshot attributes on site" do
    site = build :site
    ss = build :snapshot, site: site

    assert ss.save
    assert site.reload

    assert_equal ss.id, site.last_snapshot_id
    assert_equal ss.created_at.to_i, site.last_snapshot_at.to_i
    assert_equal ss.image(:preview), site.last_snapshot_preview
  end
end
