class StaticController < ApplicationController
  include ActionController::Rendering

  ##
  # TODO Cache this whole page indefinitely
  #      New code pushes should restart and clear the cache
  def root
    render :root, :layout => 'layouts/application'
  end
end
