module SessionsHelper

  def current_user
    return nil unless session[:session_key]
    @current_user || User.find_by_session_key(session[:session_key])
  end

  def logged_in?
    !!current_user
  end

  def login_user(user)
    user.reset_session_key
    session[:session_key] = user.session_key
  end

  def logout_user
    if logged_in?
      current_user.destroy_session_key
    end
    reset_session
  end

  def require_login
    redirect_to login_url unless logged_in?
  end

end
