class CardSerializer < ActiveModel::Serializer
  attributes :id, :comments_count, :description, :due_date, :list_id,
    :open, :position, :title

  has_one :assignee, embed: :objects
  has_many :comments, embed: :objects

  def list_id
    object.list.id
  end
end
