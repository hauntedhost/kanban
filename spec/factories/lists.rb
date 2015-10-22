# == Schema Information
#
# Table name: lists
#
#  id         :integer          not null, primary key
#  board_id   :integer          not null
#  title      :string
#  open       :boolean          default(TRUE), not null
#  created_at :datetime
#  updated_at :datetime
#  position   :integer
#
# Indexes
#
#  index_lists_on_board_id  (board_id)
#

FactoryGirl.define do
  factory :list do
    association :board
    title { Faker::Book.title }
  end
end
