class ListSerializer < ActiveModel::Serializer
  embed :ids, include: true
  attributes :id, :title, :open, :position
  has_one :board, root: :boards, key: :board
  has_many :cards, key: :cards
end
