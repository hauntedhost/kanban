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

require 'rails_helper'

RSpec.describe List, type: :model do
  let(:list) { build(:list) }

  it 'has a valid factory' do
    expect(list).to be_valid
  end

  describe 'validations' do
    it { is_expected.to validate_presence_of(:board) }
    it { is_expected.to validate_presence_of(:title) }
  end
end
