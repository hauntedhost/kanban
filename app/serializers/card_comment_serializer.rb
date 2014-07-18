class CardCommentSerializer < ActiveModel::Serializer
  embed :ids, include: true
  attributes :id, :content
  has_one :card
  has_one :commenter, root: :users, key: :user_id
end
