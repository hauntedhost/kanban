object @board
attributes :id, :description, :name, :open

child :lists do
	attributes :id, :board_id, :title, :open, :position
	child :cards do
		attributes :id, :list_id, :title, :description, :due_date, :open, :position, :comments_count
	end
end
