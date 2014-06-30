module Api
  class CardsController < ApplicationController
    respond_to :json

    def index
      @cards = current_user.cards
    end

    def show
      @card = current_user.cards.find(params[:id])
    end

    def create
      card = Card.new(params[:card])
      if card.save
        # NOTE: bug in active model serializers causes cards to render twice
        # https://github.com/rails-api/active_model_serializers/issues/521
        # for now we just render card.list and card will be side-loaded
        # in the future this will probably work: if_ember_render([card])
        if_ember_render(card.list)
      else
        render nothing: true, status: :unprocessable_entity
      end
    end

    def update
      card = current_user.cards.find(params[:id])
      if card.update_attributes(params[:card])
        render json: card, status: :ok
      else
        render nothing: true, status: :unprocessable_entity
      end
    end

    def destroy
      card = current_user.cards.find(params[:id])
      if card.destroy
        render json: card, status: :ok
      else
        render nothing: true, status: :unprocessable_entity
      end
    end

    def sort
      @list = List.find(params[:list_id])
      card_ids = params[:card].map(&:to_i)

      # unless (card_ids - current_user.card_ids).empty?
      #   render nothing: true, status: :unauthorized
      # end

      card_ids.each_with_index do |id, index|
        Card.update_all({ position: index + 1,  list_id: @list.id },
                        { id: id })
      end

      @cards = @list.cards.where(id: card_ids)
      if_ember_render(@cards)
    end
  end
end
