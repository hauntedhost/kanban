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
#

class Card < ActiveRecord::Base
  attr_accessible :description, :due_date, :list_id, :open, :title

  belongs_to :list
  has_one :board, :through => :list

  has_many :cards_members, :class_name => "CardMember"
  has_many :members, :through => :cards_members

  has_many :card_comments
  has_many :card_activities
  
end
