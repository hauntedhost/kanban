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

FactoryGirl.define do
  factory :card_comment do
    association :card
    association :commenter, factory: :user
    content { Faker::Lorem.paragraph(1) }
  end
end
