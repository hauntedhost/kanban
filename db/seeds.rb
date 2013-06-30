# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

users = User.create([
  { email: "somlor@gmail.com", password: "123" },
  { email: "somlor@eml.cc", password: "123" }
])

boards = Board.create([
  { name: "kanban app", description: "meta-kanban for this kanban app" },
  { name: "second app", description: "my second app academy app" },
  { name: "dev job", description: "job search board" }  
])

boards_members = BoardMember.create([
  { board_id: 1, member_id: 1 },
  { board_id: 2, member_id: 1 },
  { board_id: 3, member_id: 1 }  
])

