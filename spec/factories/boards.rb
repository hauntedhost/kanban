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
  end
end
