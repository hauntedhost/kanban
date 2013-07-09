# collection @lists
# extends "api/lists/show"

object false

node :list_id do
	@list.id
end

child @cards, :root => "cards" do
  extends "api/cards/show"
end
