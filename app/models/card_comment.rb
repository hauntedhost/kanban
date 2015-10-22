# == Schema Information
#
# Table name: card_comments
#
#  id           :integer          not null, primary key
#  card_id      :integer          not null
#  commenter_id :integer          not null
#  content      :text
#  created_at   :datetime
#  updated_at   :datetime
#
# Indexes
#
#  index_card_comments_on_card_id  (card_id)
#

class CardComment < ActiveRecord::Base

  belongs_to :card
  belongs_to :commenter, class_name: 'User'

  default_scope { order(created_at: :desc) }

  def created_at_timestamp
    created_at.to_time.to_i
  end
end
