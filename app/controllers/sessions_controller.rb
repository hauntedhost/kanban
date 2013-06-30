class SessionsController < ApplicationController
  before_filter :redirect_logged_in_user, :only => [:new]

  def new
    render :new
  end

  def create
    @user = User.find_by_email(params[:user][:email])

    if @user && @user.correct_password?(params[:user][:password])
      login_user(@user)
      redirect_to root_url
    else
      # TODO: add errors
      redirect_to login_url
    end
  end

  def destroy
    logout_user
    redirect_to login_url
  end
  
end
