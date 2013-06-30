class BoardsController < ApplicationController
  before_filter :require_login

  def index
    @boards = current_user.boards
    render :index
  end

end
