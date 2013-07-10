object @board
attributes :id, :description, :name, :open

child :members do
	attributes :username, :email, :full_name, :bio, :gravatar_url
end

child :lists do
	attributes :id, :board_id, :title, :open, :position
	child :cards do
		attributes :id, :list_id, :title, :description, :due_date, :open, :position, :comments_count
	end
end
