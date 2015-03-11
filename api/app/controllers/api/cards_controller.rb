module Api
  class CardsController < ApplicationController
    # respond_to :json

    def index
      cards = current_user.cards
      render json: cards
    end

    def show
      card = current_user.cards.find(params[:id])
      render json: card
    end

    def create
      card = Card.new(params[:card])
      if card.save
        render json: card, status: :ok
      else
        render nothing: true, status: :unprocessable_entity
      end
    end

    def update
      # card = current_user.cards.find(params[:id])
      card = Card.find(params[:id])
      if card.update_attributes(card_params)
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
      list = List.find(params[:list_id])
      card_ids = params[:card].map(&:to_i)

      # unless (card_ids - current_user.card_ids).empty?
      #   render nothing: true, status: :unauthorized
      # end

      card_ids.each_with_index do |card_id, index|
        Card.find(card_id)
            .update_attributes(position: index + 1, list_id: list.id)
      end

      cards = list.cards.where(id: card_ids)
      render json: cards
    end

    private

    def card_params
      params.require(:card).permit(:list_id, :position)
    end
  end
end
