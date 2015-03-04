object @comment
attributes :id, :card_id, :commenter_id, :content, :position, :created_at, :created_at_timestamp

child :commenter do
  attributes :id, :username, :email, :full_name, :bio, :gravatar_url
end
