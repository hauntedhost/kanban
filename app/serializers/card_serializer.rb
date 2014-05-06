class CardSerializer < ActiveModel::Serializer
  embed :ids, include: true
  attributes :id, :title, :description, :open, :position, :comments_count
  has_one :list
  has_one :assignee, root: :users, key: :user_ids
end
