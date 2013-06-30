# == Schema Information
#
# Table name: card_activities
#
#  id          :integer          not null, primary key
#  member_id   :integer          not null
#  card_id     :integer          not null
#  description :text             not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class CardActivity < ActiveRecord::Base
  attr_accessible :card_id, :description, :member_id
end
