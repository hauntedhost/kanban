class ApplicationController < ActionController::Base
  protect_from_forgery

  before_action :require_login
  helper_method :current_user, :logged_in?

  private

  def current_user
    return nil unless session[:session_key]
    @current_user ||= User.find_by_session_key(session[:session_key])
  end

  def logged_in?
    !!current_user
  end

  def redirect_logged_in_user
    if logged_in?
      redirect_to root_url
    end
  end

  def require_login
    unless logged_in?
      respond_to do |format|
        format.html { redirect_to login_url }
        format.json { render json: { nope: true }, status: :unauthorized }
      end
    end
  end
end
