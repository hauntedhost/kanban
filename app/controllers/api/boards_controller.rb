module Api
  class BoardsController < ApplicationController
    respond_to :json

    def index
      boards = current_user.boards
      render :json => boards
    end

    def show
      board = current_user.boards.find(params[:id])
      render :json => board
    end

    # def lists
    #   board = current_user.boards.find(params[:id])
    #   lists = board.lists
    #   render :json => lists
    # end
  end
end