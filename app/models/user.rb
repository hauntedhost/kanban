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
  attr_accessible :username, :email, :password 
  attr_reader :password
  default_scope :order => 'id'

  has_many :boards_members, 
    :class_name => "BoardMember", 
    :foreign_key => :member_id

  has_many :cards_members, 
    :class_name => "CardMember", 
    :foreign_key => :member_id

  has_many :boards, :through => :boards_members 
  has_many :lists, :through => :boards
  has_many :cards, :through => :lists

  validates_uniqueness_of :email
  validates_presence_of :email, :password_digest
  validates_length_of :password, { :minimum => 3 }

  def password
    @password || self.password_digest
  end

  def password=(password)
    @password = password_digest
    self.password_digest = BCrypt::Password.create(password)
  end

  def correct_password?(password)
    BCrypt::Password.new(self.password_digest) == password
  end

  def reset_session_key
    new_key = SecureRandom.urlsafe_base64(32)
    while User.find_by_session_key(new_key)
      new_key = SecureRandom.urlsafe_base64(32)
    end
    self.session_key = new_key
    save
  end

  def destroy_session_key
    self.session_key = nil
    save
  end

  def correct_session_key?(key) 
    key == self.session_key
  end

  def gravatar_url(size = 80)
    md5 = Digest::MD5.hexdigest(self.email)
    "http://www.gravatar.com/avatar/#{md5}?s=#{size}" 
  end

  def as_json(options = {})
    super(options.merge(:only => [:username, :email, :bio], 
                        :methods => :gravatar_url))
  end

end
