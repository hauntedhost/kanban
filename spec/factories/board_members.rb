# == Schema Information
#
# Table name: board_members
#
#  id         :integer          not null, primary key
#  board_id   :integer          not null
#  member_id  :integer          not null
#  admin      :boolean          default(FALSE), not null
#  created_at :datetime
#  updated_at :datetime
#
# Indexes
#
#  index_board_members_on_board_id                (board_id)
#  index_board_members_on_board_id_and_member_id  (board_id,member_id) UNIQUE
#

FactoryGirl.define do
  factory :board_member do
    association :board
    association :member, factory: :user
  end
end
