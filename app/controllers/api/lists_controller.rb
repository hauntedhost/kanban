module Api
  class ListsController < ApplicationController
    respond_to :json

    def index
      lists = current_user.lists
      render :json => lists
    end

    def show
      list = current_user.lists.find(params[:id])
      render :json => list
    end
    
  end
end
