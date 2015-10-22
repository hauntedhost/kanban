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

require 'rails_helper'

RSpec.describe Board, type: :model do
  let(:board) { build(:board) }

  it 'has a valid factory' do
    expect(board).to be_valid
  end

  describe 'validations' do
    it { is_expected.to validate_presence_of(:name) }
  end
end
