class CardCommentSerializer < ActiveModel::Serializer
  attributes :id, :card_id, :commenter_id, :content, :created_at,
    :created_at_timestamp

  has_one :user, embed: :objects

  def card_id
    object.card.id
  end

  def commenter_id
    object.commenter.try(:id)
  end

  def user
    object.commenter
  end
end
