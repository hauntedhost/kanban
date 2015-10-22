# == Schema Information
#
# Table name: lists
#
#  id         :integer          not null, primary key
#  board_id   :integer          not null
#  title      :string
#  open       :boolean          default(TRUE), not null
#  created_at :datetime
#  updated_at :datetime
#  position   :integer
#
# Indexes
#
#  index_lists_on_board_id  (board_id)
#

class List < ActiveRecord::Base
  acts_as_list

  belongs_to :board
  has_many :cards, dependent: :destroy

  validates_presence_of :board, :title

  default_scope { order(:position) }

end
