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

class Board < ActiveRecord::Base

  has_many :lists
  has_many :board_activities
  has_many :boards_members, class_name: "BoardMember"
  has_many :members, through: :boards_members

end
