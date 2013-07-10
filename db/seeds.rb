# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

users = User.create([
  { full_name: "Sean Omlor", bio: "Rails hacker", email: "somlor@gmail.com", password: "123" },
  { full_name: "Sebastian", bio: "Strange cat", email: "sebastian@catmail.com", password: "123" },
  { full_name: "Alli", bio: "Banana slug", email: "alli.crwfrd@gmail.com", password: "123" }  
])

boards = Board.create([
  { name: "final project", description: "meta-kanban for this kanban app" },
  { name: "second app", description: "my second app academy app" },
  { name: "dev job", description: "job search board" }  
])

boards_members = BoardMember.create([
  { board_id: 1, member_id: 1 },
  { board_id: 1, member_id: 2 },
  { board_id: 1, member_id: 3 },  
  { board_id: 2, member_id: 1 },
  { board_id: 3, member_id: 1 }  
])

lists = List.create([
  { board_id: 1, title: "todo" },           # kanban app
  { board_id: 1, title: "in progress" },    # kanban app
  { board_id: 1, title: "finished" },       # kanban app
  { board_id: 2, title: "ideas" },          # second app
  { board_id: 3, title: "apply" },          # dev job
  { board_id: 3, title: "applied" }         # dev job
])

card = Card.create([
  { list_id: 1, title: "pass lists/cards with board" }, # kanban/todo 
  { list_id: 3, title: "add boards index" },            # kanban/finished
  { list_id: 3, title: "add boards show" },             # kanban/finished
  { list_id: 4, title: "chains.cc" }                    # second app/ideas
])

card_comments = CardComment.create([
	{ card_id: 1, commenter_id: 1, content: "hello world" },
	{ card_id: 1, commenter_id: 1, content: "will do this soon" },
	{ card_id: 2, commenter_id: 1, content: "nice" }
])


