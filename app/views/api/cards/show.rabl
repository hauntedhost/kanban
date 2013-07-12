object @card
attributes :id, :list_id, :title, :description, :due_date, :open, :position, :comments_count

child :assignee => :assignee do
	attributes :id, :username, :email, :full_name, :bio, :gravatar_url
end

child :comments => :comments do
	attributes :id, :card_id, :commenter_id, :content, :position, :created_at, :created_at_timestamp

	child :commenter do
		attributes :id, :username, :email, :full_name, :bio, :gravatar_url
	end
end
