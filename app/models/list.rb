# == Schema Information
#
# Table name: lists
#
#  id         :integer          not null, primary key
#  board_id   :integer          not null
#  title      :string(255)
#  open       :boolean          default(TRUE), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  position   :integer
#

class List < ActiveRecord::Base
  attr_accessible :board_id, :title, :open, :position
  default_scope :order => "lists.position"
  acts_as_list

  belongs_to :board
  has_many :cards, :dependent => :destroy

  def as_json(options = {})
    super(options.merge(:include => :cards))
  end

end
