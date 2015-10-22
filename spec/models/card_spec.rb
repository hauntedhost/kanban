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

require 'rails_helper'

RSpec.describe Card, type: :model do
  let(:card) { build(:card) }

  it 'has a valid factory' do
    expect(card).to be_valid
  end

  describe 'validations' do
    it { is_expected.to validate_presence_of(:list) }
    it { is_expected.to validate_presence_of(:title) }
  end
end
