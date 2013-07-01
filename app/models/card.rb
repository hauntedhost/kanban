# == Schema Information
#
# Table name: cards
#
#  id          :integer          not null, primary key
#  list_id     :integer          not null
#  title       :string(255)      not null
#  description :text
#  due_date    :datetime
#  open        :boolean          default(TRUE), not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  position    :integer
#

class Card < ActiveRecord::Base
  attr_accessible :list_id, :title, :description, :due_date, :open, :position
  default_scope :order => "cards.position"

  belongs_to :list
  has_one :board, :through => :list

  has_many :cards_members, :class_name => "CardMember"
  has_many :members, :through => :cards_members

  has_many :card_comments
  has_many :card_activities
  
end
