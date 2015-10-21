module Api
  class UsersController < ApplicationController

    def show
      user = User.find(params[:id])
      render json: user
    end

    def current
      if current_user
        render json: current_user
      else
        render nothing: true, status: :not_found
      end
    end
  end
end
