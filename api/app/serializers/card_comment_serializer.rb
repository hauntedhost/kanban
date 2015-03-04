class CardCommentSerializer < ActiveModel::Serializer
  attributes :id, :content

  has_one :card
  # has_one :commenter, root: :users, key: :user_id
end
