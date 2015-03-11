# == Schema Information
#
# Table name: card_comments
#
#  id           :integer          not null, primary key
#  card_id      :integer          not null
#  commenter_id :integer          not null
#  content      :text
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class CardComment < ActiveRecord::Base
  # attr_accessible :card_id, :commenter_id, :content
  # default_scope order: "card_comments.created_at desc"

  belongs_to :card
  belongs_to :commenter, class_name: 'User'

  def created_at_timestamp
    created_at.to_time.to_i
  end
end
