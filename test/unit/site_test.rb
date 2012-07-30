require 'test_helper'

class SiteTest < ActiveSupport::TestCase
  setup do
    Timecop.return
  end

  test "name required" do
    site = build :site, name: nil

    assert site.invalid?
    assert site.errors.include?(:name)
  end

  test "url required" do
    site = build :site, url: nil

    assert site.invalid?
    assert site.errors.include?(:url)
  end

  #test "category required" do
  #  site = build :site, category: nil

  #  assert site.invalid?
  #  assert site.errors.include?(:category)
  #end

  test "ident generation" do
    site = create :site, name: 'Test Ident'

    assert site.ident
    assert_equal 'Test Ident'.parameterize, site.ident
  end

  test "with stale snapshots" do
    time = Time.local(2011, 1, 1, 12)
    Timecop.freeze(time)

    # create 2 that are older; all depends on STALE_DELAY
    5.times { |n| create :site, last_snapshot_at: time - (n * (Site::STALE_DELAY / 3.0)).seconds }

    assert_equal 2, Site.with_stale_snapshots.count
  end

  test "with stale snapshots with nil" do
    create :site

    assert_equal 1, Site.with_stale_snapshots.count
  end

  test "last snapshot at required" do
    site = build :site

    assert site.valid?
    assert site.save

    assert site.invalid?
    assert site.errors.include?(:last_snapshot_at)
  end
end
