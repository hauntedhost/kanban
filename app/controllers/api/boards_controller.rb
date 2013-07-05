module Api
  class BoardsController < ApplicationController
    respond_to :json

    def index
      boards = current_user.boards.includes(:lists)
      render :json => boards
    end

    def show
      board = current_user.boards.find(params[:id])
      render :json => board
    end
    
  end
end