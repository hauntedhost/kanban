object @list
attributes :id, :board_id, :title, :open, :position

child :cards do
	attributes :id, :list_id, :title, :description, :due_date, :open, :position, :comments_count

	child assignee: :assignee do
		attributes :id, :username, :email, :full_name, :bio, :gravatar_url
	end
end
