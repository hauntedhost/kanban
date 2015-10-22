class ListSerializer < ActiveModel::Serializer
  attributes :id, :board_id, :open, :position, :title

  has_many :cards, embed: :objects

  def board_id
    object.board.id
  end
end
