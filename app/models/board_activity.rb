# == Schema Information
#
# Table name: board_activities
#
#  id          :integer          not null, primary key
#  member_id   :integer          not null
#  board_id    :integer          not null
#  description :text             not null
#  created_at  :datetime
#  updated_at  :datetime
#
# Indexes
#
#  index_board_activities_on_board_id  (board_id)
#

class BoardActivity < ActiveRecord::Base

  belongs_to :member, class_name: 'User'
  belongs_to :board

  validates_presence_of :board, :member, :description
end
