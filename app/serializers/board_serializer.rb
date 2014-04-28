class BoardSerializer < ActiveModel::Serializer
  embed :ids, include: true
  attributes :id, :description, :name, :open
  has_many :members, key: :users, root: :users
  has_many :lists
end
