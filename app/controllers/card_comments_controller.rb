class CardCommentsController < ApplicationController
	# def index
	# 	card = current_user.cards.find(params[:id])
	# 	comments = card.comments
	# 	render :json => comments, :status => :ok
	# end

  def create
    card = current_user.cards.find(params[:card_comment][:card_id])
    params[:card_comment][:commenter_id] = current_user.id
    comment = card.comments.build(params[:card_comment])
    if comment.save
      render :json => comment, :status => :ok
    else
      render :nothing => true, :status => :unprocessable_entity
    end
  end
end
