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

    def sort
      list_ids = params[:list].map(&:to_i)

      # are lists owned by current user?
      if (list_ids - current_user.list_ids).empty?

        # TODO: move sort model
        list_ids.each_with_index do |id, index|
          List.update_all({ position: index + 1 }, { id: id })
        end

        # return re-sorted lists
        board = List.find(list_ids.first).board
        render :json => board.lists
        # render :nothing => true, :status => :ok
      else
        render :nothing => true, :status => :unprocessable_entity
      end
    end

  end
end
