class BoardSerializer < ActiveModel::Serializer
  attributes :id, :description, :name, :open

  has_many :lists
  # has_many :members, root: :users, key: :user_ids
end
