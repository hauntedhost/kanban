module Api
  class ListsController < ApplicationController

    def index
      lists = current_user.lists
      render json: lists
    end

    def show
      list = current_user.lists.find(params[:id])
      render json: list
    end

    def create
      list = List.new(list_params)
      if list.save
        render json: list, status: :ok
      else
        render nothing: true, status: :unprocessable_entity
      end
    end

    def update
      list = current_user.lists.find(params[:id])
      if list.update_attributes(list_params)
        render json: list, status: :ok
      else
        render nothing: true, status: :unprocessable_entity
      end
    end

    def destroy
      list = current_user.lists.find(params[:id])
      if list.destroy
        render json: list, status: :ok
      else
        render nothing: true, status: :unprocessable_entity
      end
    end

    def sort
      list_ids = params[:list].map(&:to_i)

      # TODO: authorize lists
      # unless (list_ids - current_user.list_ids).empty?
      #   render nothing: true, status: :unauthorized
      # end

      list_ids.each_with_index do |list_id, index|
        List.find(list_id).update_attributes(position: index + 1)
      end

      # return re-sorted lists
      lists = List.find(list_ids.first).board.lists
      render json: lists
    end

    private

    def list_params
      params.require(:list)
            .permit(:board_id, :open, :position, :title)
    end
  end
end
