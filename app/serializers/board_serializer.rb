class BoardSerializer < ActiveModel::Serializer
  attributes :id, :description, :name, :open

  has_many :lists, embed: :objects
  has_many :users, embed: :objects

  def users
    object.members
  end
end
