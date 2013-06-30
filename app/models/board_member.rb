# == Schema Information
#
# Table name: board_members
#
#  id         :integer          not null, primary key
#  board_id   :integer          not null
#  member_id  :integer          not null
#  admin      :boolean          default(FALSE), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class BoardMember < ActiveRecord::Base
  attr_accessible :admin, :board_id, :member_id

  belongs_to :board
  belongs_to :member, :class_name => "User"
  has_many :lists

  validates_uniqueness_of :board_id, :scope => [:board_id, :member_id] 
  validates_uniqueness_of :member_id, :scope => [:member_id, :board_id] 

end
