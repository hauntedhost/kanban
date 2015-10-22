# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  email           :string           not null
#  password_digest :string
#  session_key     :string
#  activation_key  :string
#  bio             :string
#  created_at      :datetime
#  updated_at      :datetime
#  full_name       :string
#
# Indexes
#
#  index_users_on_session_key  (session_key)
#

FactoryGirl.define do
  factory :user do
    full_name { Faker::Name.name }
    email { Faker::Internet.email }
    password '12345678'
    password_confirmation '12345678'
    bio { Faker::Lorem.paragraph(1) }
  end
end
