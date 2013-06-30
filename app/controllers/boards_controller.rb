class BoardsController < ApplicationController
  before_filter :require_login
  respond_to :json

  def index
    boards = current_user.boards
    render :json => boards
  end

  def show
    # board = current_user.includes(:lists => :cards).find(params[:id])
    board = current_user.boards.find(params[:id])
    render :json => board    
  end
end
