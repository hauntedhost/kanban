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

class User < ActiveRecord::Base
  attr_accessible :activation_key, :bio, :email, :password_digest, :session_key, :username


end
