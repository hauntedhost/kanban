module Api
  class BoardsController < ApplicationController

    def index
      boards = current_user.boards.includes(:lists)
      render json: boards
    end

    def show
      board = current_user.boards.find(params[:id])
      render json: board
    end

    def create
      board = Board.new(board_params)

      if board.save
        board.members << current_user
        render json: board, status: :ok
      else
        render json: board.errors, status: :unprocessable_entity
      end
    end

    def update
      board = current_user.boards.find(params[:id])
      if board.update_attributes(board_params)
        render json: board, status: :ok
      else
        render nothing: true, status: :unprocessable_entity
      end
    end

    private

    def board_params
      params.require(:board)
            .permit(:description, :name, :open)
    end
  end
end
