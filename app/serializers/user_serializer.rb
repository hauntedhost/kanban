class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :full_name, :bio, :gravatar_url
end
