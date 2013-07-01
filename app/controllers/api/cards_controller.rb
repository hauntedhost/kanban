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
    
  end
end
