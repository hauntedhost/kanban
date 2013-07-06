object @card
attributes :id, :list_id, :title, :description, :due_date, :open, :position, :comments_count

child :comments => :comments do
	attributes :id, :card_id, :commenter_id, :content, :position, :created_at, :created_at_timestamp
end
