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

  belongs_to :card
  belongs_to :member, class_name: "User"

  validates_uniqueness_of :card_id, scope: [:card_id, :member_id]
  validates_uniqueness_of :member_id, scope: [:member_id, :card_id]

end
