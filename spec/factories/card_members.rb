# == Schema Information
#
# Table name: card_members
#
#  id         :integer          not null, primary key
#  card_id    :integer          not null
#  member_id  :integer          not null
#  created_at :datetime
#  updated_at :datetime
#
# Indexes
#
#  index_card_members_on_card_id                (card_id)
#  index_card_members_on_card_id_and_member_id  (card_id,member_id) UNIQUE
#

FactoryGirl.define do
  factory :card_member do
    association :card
    association :member, factory: :user
  end
end
