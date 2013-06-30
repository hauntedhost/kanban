# == Schema Information
#
# Table name: card_comments
#
#  id           :integer          not null, primary key
#  card_id      :integer          not null
#  commenter_id :integer          not null
#  content      :text
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

require 'test_helper'

class CardCommentTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
