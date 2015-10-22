# == Schema Information
#
# Table name: board_members
#
#  id         :integer          not null, primary key
#  board_id   :integer          not null
#  member_id  :integer          not null
#  admin      :boolean          default(FALSE), not null
#  created_at :datetime
#  updated_at :datetime
#
# Indexes
#
#  index_board_members_on_board_id                (board_id)
#  index_board_members_on_board_id_and_member_id  (board_id,member_id) UNIQUE
#

class BoardMember < ActiveRecord::Base

  belongs_to :board
  belongs_to :member, class_name: 'User'
  has_many :lists

  validates_uniqueness_of :board_id, scope: [:board_id, :member_id]
  validates_uniqueness_of :member_id, scope: [:member_id, :board_id]

end
