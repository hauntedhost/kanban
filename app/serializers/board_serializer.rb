# == Schema Information
#
# Table name: boards
#
#  id          :integer          not null, primary key
#  name        :string
#  description :string
#  open        :boolean          default(TRUE), not null
#  created_at  :datetime
#  updated_at  :datetime
#
# Indexes
#
#  index_boards_on_open  (open)
#

class BoardSerializer < ActiveModel::Serializer
  attributes :id, :description, :name, :open

  has_many :lists, embed: :objects
  has_many :users, embed: :objects

  def users
    object.members
  end
end
