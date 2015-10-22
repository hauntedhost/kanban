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

require 'rails_helper'

RSpec.describe User, type: :model do
  let(:user) { build(:user) }

  it 'has a valid factory' do
    expect(user).to be_valid
  end

  describe 'validations' do
    it { is_expected.to validate_presence_of(:email) }
    it { is_expected.to validate_uniqueness_of(:email) }
    it { is_expected.to validate_presence_of(:password) }
    it { is_expected.to validate_confirmation_of(:password) }
    it {
      is_expected.to (
        validate_length_of(:password)
          .is_at_least(8)
          .is_at_most(64)
      )
    }
  end
end
