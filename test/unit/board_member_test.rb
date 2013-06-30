# == Schema Information
#
# Table name: board_members
#
#  id         :integer          not null, primary key
#  board_id   :integer          not null
#  member_id  :integer          not null
#  admin      :boolean          default(FALSE), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require 'test_helper'

class BoardMemberTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
