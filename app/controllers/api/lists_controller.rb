module Api
  class ListsController < ApplicationController
    respond_to :json

    def index
      @lists = current_user.lists
      if_ember_render(@lists)
    end

    def show
      @list = current_user.lists.find(params[:id])
      if_ember_render(@list.board)
    end

    def create
      list = List.new(params[:list])
      if list.save
        # NOTE: bug in active model serializers causes lists to render twice
        # https://github.com/rails-api/active_model_serializers/issues/521
        # for now we just render list.board and list will be side-loaded
        # in the future this will probably work: if_ember_render([list])
        if_ember_render(list.board)
      else
        render nothing: true, status: :unprocessable_entity
      end
    end

    def update
      list = current_user.lists.find(params[:id])
      if list.update_attributes(params[:list])
        if_ember_render(list.board)
      else
        render nothing: true, status: :unprocessable_entity
      end
    end

    def destroy
      list = current_user.lists.find(params[:id])
      if list.destroy
        if_ember_render(list.board)
      else
        render nothing: true, status: :unprocessable_entity
      end
    end

    def sort
      list_ids = params[:list].map(&:to_i)

      unless (list_ids - current_user.list_ids).empty?
        render nothing: true, status: :unauthorized
      end

      list_ids.each_with_index do |id, index|
        List.update_all({ position: index + 1 }, { id: id })
      end

      # return re-sorted lists
      @lists = List.find(list_ids.first).board.lists
      if_ember_render(@lists)
    end
  end
end
