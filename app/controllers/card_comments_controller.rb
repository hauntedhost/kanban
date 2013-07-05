class CardCommentsController < ApplicationController
	def index
		card = current_user.cards.find(params[:id])
		comments = card.comments
		render :json => comments, :status => :ok
	end
end
