module Api
  class CardCommentsController < ApplicationController

    def create
      card = current_user.cards.find(params[:card_comment][:card_id])
      params[:card_comment][:commenter_id] = current_user.id

      comment = card.comments.build(card_comment_params)
      if comment.save
        render json: comment
      else
        render nothing: true, status: :unprocessable_entity
      end
    end

    private

    def card_comment_params
      params.require(:card_comment)
            .permit(:card_id, :commenter_id, :content)
    end
  end
end
