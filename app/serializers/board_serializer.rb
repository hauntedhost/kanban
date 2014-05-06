class BoardSerializer < ActiveModel::Serializer
  embed :ids, include: true
  attributes :id, :description, :name, :open
  has_many :members, root: :users, key: :user_ids
  has_many :lists
end
