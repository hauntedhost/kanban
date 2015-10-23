# == Schema Information
#
# Table name: boards
#
#  id          :integer          not null, primary key
#  name        :string
#  description :string
#  open        :boolean          default(TRUE), not null
#  created_at  :datetime
#  updated_at  :datetime
#
# Indexes
#
#  index_boards_on_open  (open)
#

FactoryGirl.define do
  factory :board do
    name { Faker::Book.title }
    description { Faker::Lorem.paragraph(1) }

    transient do
      member nil
      members []
    end

    after(:build) do |board, evaluator|
      if evaluator.member.present?
        board.members << evaluator.member
      end

      if evaluator.members.any?
        board.members << evaluator.members
      end
    end
  end
end
