class CardSerializer < ActiveModel::Serializer
  attributes :id, :comments_count, :description, :open, :position, :title

  has_many :comments, root: :card_comments, key: :card_comment_ids
  has_one :list
  # has_one :assignee, root: :users, key: :user_id
end
