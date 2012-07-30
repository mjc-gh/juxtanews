class ApplicationController < ActionController::API
  include ActionController::MimeResponds
  include ActionController::Caching

  self.page_cache_directory = Rails.public_path

  respond_to :json, :xml
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found 

  def render_not_found(exception)
    logger.info "RenderNotFound: #{exception.message} (#{exception.class})"

    respond_with({ error: I18n.t(:not_found) }, status: :not_found)
  end
end

