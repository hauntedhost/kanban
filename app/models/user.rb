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

require 'digest/md5'

class User < ActiveRecord::Base
  has_secure_password

  has_many :boards_members,
           class_name: 'BoardMember',
           foreign_key: :member_id

  has_many :cards_members,
           class_name: 'CardMember',
           foreign_key: :member_id

  has_many :boards, through: :boards_members
  has_many :lists, through: :boards
  has_many :cards, through: :lists

  has_many :cards_assigned,
           class_name: 'Card',
           foreign_key: :assignee_id

  validates_presence_of :email, :password_digest
  validates_length_of :password, in: 8..64
  validates_uniqueness_of :email

  default_scope { order(:id) }

  def gravatar_url(size = 32)
    md5 = Digest::MD5.hexdigest(self.email)
    "http://www.gravatar.com/avatar/#{md5}?s=#{size}"
  end
end
