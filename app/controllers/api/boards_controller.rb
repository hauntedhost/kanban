module Api
  class BoardsController < ApplicationController
    respond_to :json

    def index
      @boards = current_user.boards.includes(:lists)
    end

    def show
      @board = current_user.boards.find(params[:id])
    end

    def update
    	board = current_user.boards.find(params[:id])
    	if board.update_attributes(params[:board])
        render json: board, status: :ok
      else
        render nothing: true, status: :unprocessable_entity
      end    		
    end

  end
end