# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  username        :string(255)
#  email           :string(255)      not null
#  password_digest :string(255)
#  session_key     :string(255)
#  activation_key  :string(255)
#  bio             :string(255)
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
require "digest/md5"

class User < ActiveRecord::Base
  attr_accessible :username, :email, :full_name, :bio

  default_scope order: 'id'

  has_many :boards_members,
           class_name: "BoardMember",
           foreign_key: :member_id

  has_many :cards_members,
           class_name: "CardMember",
           foreign_key: :member_id

  has_many :boards, through: :boards_members
  has_many :lists, through: :boards
  has_many :cards, through: :lists

  has_many :cards_assigned,
           class_name: "Card",
           foreign_key: :assignee_id

  validates_uniqueness_of :email
  validates_presence_of :email, :password_digest
  validates_length_of :password, { minimum: 3 }

  has_secure_password

  def gravatar_url(size = 32)
    md5 = Digest::MD5.hexdigest(self.email)
    "http://www.gravatar.com/avatar/#{md5}?s=#{size}"
  end

  def as_json(options = {})
    super(options.merge(only: [:username, :email, :bio],
                        methods: :gravatar_url))
  end
end
