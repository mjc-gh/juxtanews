class SitesController < ApplicationController
  before_filter :find_site, except: :index

  def index
    respond_with Site.all
  end

  def show
    respond_with @site
  end

  protected

  def find_site
    @site = Site.find_by_ident!(params[:id])
  end
end
