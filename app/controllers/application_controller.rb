class ApplicationController < ActionController::Base
  protect_from_forgery

  include SessionsHelper

  def redirect_logged_in_user
    if logged_in?
      redirect_to root_url
    end
  end

  def if_ember_render(things, options = {})
    options = options.reverse_merge(json: things)
    if params[:ember] || request.headers["ember"]
      render options
    end
  end
end
