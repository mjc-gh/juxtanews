class SnapshotsController < ApplicationController
  before_filter :find_site

  def index
    offset = params[:offset]

    respond_with @site.snapshots.limit(20).offset(offset || 0).as_json(:methods => [ :thumbnail ])
  end

  def latest
    respond_with @site.last_snapshot
  end

  def show
    respond_with @site.snapshots.find(params[:id])
  end

  protected

  def find_site
    @site = Site.find_by_ident!(params[:site_id])
  end
end
