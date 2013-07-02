module Api
  class CardsController < ApplicationController
    respond_to :json

    def index
      cards = current_user.cards
      render :json => cards    
    end

    def show
      card = current_user.cards.find(params[:id])
      render :json => card
    end

    def sort
      list = List.find(params[:list_id])
      card_ids = params[:card].map(&:to_i)

      # cards owned by current user?
      if (card_ids - current_user.card_ids).empty?
        # TODO: move sort to model
        card_ids.each_with_index do |id, index|
          Card.update_all({ position: index + 1,  list_id: list.id }, 
                          { id: id })
        end

        # return re-sorted cards
        # list = Card.find(card_ids.first).list
        # render :json => list.cards

        # return re-sorted lists
        board = Card.find(card_ids.first).board
        render :json => board.lists
      else
        render :nothing => true, :status => :unprocessable_entity
      end
    end

  end
end
