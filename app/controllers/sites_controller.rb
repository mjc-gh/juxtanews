class SitesController < ApplicationController
  before_filter :find_all_sites, except: :show
  before_filter :find_site, only: :show

  def home
    render :index, layout: 'layouts/application'
  end

  def index
    respond_with @sites
  end

  def show
    respond_with @site
  end

  protected

  def find_all_sites
    @sites = Site.all
  end

  def find_site
    @site = Site.find_by_ident!(params[:id])
  end
end
