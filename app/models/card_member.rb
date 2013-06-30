# == Schema Information
#
# Table name: card_members
#
#  id         :integer          not null, primary key
#  card_id    :integer          not null
#  member_id  :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class CardMember < ActiveRecord::Base
  attr_accessible :card_id, :member_id
end
