class ListSerializer < ActiveModel::Serializer
  embed :ids, include: true
  attributes :id, :title, :open, :position
  has_one :board, root: :boards
  has_many :cards
end
