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

FactoryGirl.define do
  factory :card do
    association :list
    association :assignee, factory: :user
    title { Faker::Book.title }
    description { Faker::Lorem.paragraph(1) }
  end
end
