module LoginMacros
  # def sign_in(user, password = '12345678')
  #   visit root_path
  #   click_link 'Login'
  #   fill_in :email, with: user.email
  #   fill_in :password, with: password
  #   find('input[type="submit"]').click
  # end

  def set_user_session(user, password = '12345678')
    UserAuth.new(user).login(password)
    session[:session_key] = user.session_key
  end
end
