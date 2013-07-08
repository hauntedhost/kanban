module Api
  class CardsController < ApplicationController
    respond_to :json

    def index
      @cards = current_user.cards
      # render :json => cards
    end

    def show
      @card = current_user.cards.find(params[:id])
      # render :json => card
    end

    def create
    	card = Card.new(params[:card])
    	if card.save
    		render :json => card, :status => :ok
    	else
    		render :nothing => true, :status => :unprocessable_entity
    	end
    end

    def destroy
      card = current_user.cards.find(params[:id])
			if card.destroy
				render :json => card, :status => :ok
			else
				render :nothing => true, :status => :unprocessable_entity
			end
    end

    def sort
      list = List.find(params[:list_id])
      card_ids = params[:card].map(&:to_i)

      unless (card_ids - current_user.card_ids).empty?
    		render :nothing => true, :status => :unauthorized
    	end

      card_ids.each_with_index do |id, index|
        Card.update_all({ position: index + 1,  list_id: list.id },
                        { id: id })
      end

      @lists = Card.find(card_ids.first).board.lists
      # render :json => board.lists
    end

  end
end
