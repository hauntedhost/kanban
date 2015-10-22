# == Schema Information
#
# Table name: card_activities
#
#  id          :integer          not null, primary key
#  member_id   :integer          not null
#  card_id     :integer          not null
#  description :text             not null
#  created_at  :datetime
#  updated_at  :datetime
#
# Indexes
#
#  index_card_activities_on_card_id  (card_id)
#

class CardActivity < ActiveRecord::Base

  belongs_to :member, class_name: 'User'
  belongs_to :card

  validates_presence_of :card, :member, :description
end
