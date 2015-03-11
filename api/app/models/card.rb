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
  # attr_accessible :list_id, :assignee_id, :title, :description, :due_date, :open, :position,
  #                 :comments_attributes
  # default_scope order: 'cards.position'

  # acts_as_list

  belongs_to :list
  belongs_to :assignee, class_name: 'User'
  has_one :board, through: :list
  has_many :cards_members, class_name: 'CardMember'
  has_many :members, through: :cards_members
  has_many :comments, class_name: 'CardComment'
  has_many :activities, class_name: 'CardActivities'

  accepts_nested_attributes_for :comments

  def comments_count
    comments.count
  end

  # def as_json(options = {})
  #   super(options.merge(only: [:username, :email, :bio],
  #                       methods: :gravatar_url))
  # end

  # def as_json(options = {})
  #   super(options.merge(include: :comments,
  #                       methods: :comments_counts))
  # end
end
