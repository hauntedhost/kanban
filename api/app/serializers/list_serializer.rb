class ListSerializer < ActiveModel::Serializer
  attributes :id, :open, :position, :title

  has_one :board
  has_many :cards
end
