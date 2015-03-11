class UserAuth
  attr_reader :user

  def initialize(user)
    @user = user
  end

  def login(password)
    if user && correct_password?(password)
      reset_session_key
      true
    else
     false
    end
  end

  def logout
    destroy_session_key if user
  end

  def correct_password?(password)
    BCrypt::Password.new(user.password_digest) == password
  end

  private

  def reset_session_key
    user.update_attribute(:session_key, new_session_key)
  end

  def destroy_session_key
    user.update_attribute(:session_key, nil)
  end

  def new_session_key
    new_key = SecureRandom.urlsafe_base64(32)
    while User.find_by_session_key(new_key)
      new_key = SecureRandom.urlsafe_base64(32)
    end
    new_key
  end
end
