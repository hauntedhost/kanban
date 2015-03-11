module SessionsHelper

  def current_user
    return nil unless session[:session_key]
    @current_user || User.find_by_session_key(session[:session_key])
  end

  def logged_in?
    !!current_user
  end

  def require_login
    redirect_to login_url unless logged_in?
  end
end
