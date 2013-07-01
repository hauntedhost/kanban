# == Schema Information
#
# Table name: lists
#
#  id         :integer          not null, primary key
#  board_id   :integer          not null
#  title      :string(255)
#  open       :boolean          default(TRUE), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  position   :integer
#

require 'test_helper'

class ListTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
