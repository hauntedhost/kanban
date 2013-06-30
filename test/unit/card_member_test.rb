# == Schema Information
#
# Table name: card_members
#
#  id         :integer          not null, primary key
#  card_id    :integer          not null
#  member_id  :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require 'test_helper'

class CardMemberTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
