# == Schema Information
#
# Table name: cards
#
#  id          :integer          not null, primary key
#  list_id     :integer          not null
#  title       :string           not null
#  description :text
#  due_date    :datetime
#  open        :boolean          default(TRUE), not null
#  created_at  :datetime
#  updated_at  :datetime
#  position    :integer
#  assignee_id :integer
#
# Indexes
#
#  index_cards_on_list_id  (list_id)
#

class Card < ActiveRecord::Base
  acts_as_list

  belongs_to :list
  belongs_to :assignee, class_name: 'User'

  has_one :board, through: :list

  has_many :cards_members, class_name: 'CardMember'
  has_many :members, through: :cards_members

  has_many :comments, class_name: 'CardComment'
  has_many :activities, class_name: 'CardActivities'

  validates_presence_of :list, :title

  accepts_nested_attributes_for :comments

  default_scope { order(:position) }

  def comments_count
    comments.count
  end
end
