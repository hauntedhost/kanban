module Api
  class BoardsController < ApplicationController
    # respond_to :json

    def index
      # boards = current_user.boards.includes(:lists)
      boards = Board.all
      render json: boards
    end

    def show
      # @board = current_user.boards.find(params[:id])
      board = Board.find(params[:id])
      render json: board
    end

    # def create
    #   board = Board.new(params[:board])

    #   if board.save
    #     board.members << current_user
    #     render json: board, status: :ok
    #   else
    #     render json: board.errors, status: :unprocessable_entity
    #   end
    # end

    # def update
    #   board = current_user.boards.find(params[:id])
    #   if board.update_attributes(params[:board])
    #     render json: board, status: :ok
    #   else
    #     render nothing: true, status: :unprocessable_entity
    #   end
    # end
  end
end