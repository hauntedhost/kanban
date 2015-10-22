# == Schema Information
#
# Table name: card_comments
#
#  id           :integer          not null, primary key
#  card_id      :integer          not null
#  commenter_id :integer          not null
#  content      :text
#  created_at   :datetime
#  updated_at   :datetime
#
# Indexes
#
#  index_card_comments_on_card_id  (card_id)
#

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
