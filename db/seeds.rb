# create users
users_data = [
  { email: 'homer@sent.as', password: '12345678', password_confirmation: '12345678', bio: 'Homer Simpson', full_name: 'Homer' },
  { email: 'marge@sent.as', password: '12345678', password_confirmation: '12345678', bio: 'Marge Simpson', full_name: 'Marge' },
  { email: 'bart@sent.as', password: '12345678', password_confirmation: '12345678', bio: 'Bart Simpson', full_name: 'Bart' },
  { email: 'lisa2@sent.as', password: '12345678', password_confirmation: '12345678', bio: 'Lisa Simpson', full_name: 'Lisa' },
  { email: 'maggie@sent.as', password: '12345678', password_confirmation: '12345678', bio: 'Maggie Simpson', full_name: 'Maggie' }
]

users = users_data.reduce({}) do |result, user_data|
  result[user_data[:email]] = User.create(user_data)
  result
end

# create board
board = Board.create(
  name: 'Simpson Family Chores',
  description: 'Chores manager for Simpson family'
)

# add all users to board
users.map do |(key, user)|
  BoardMember.create(board: board, member: user)
end

# create lists
lists_data = [
  { board: board, title: 'Chore List', position: 1 },
  { board: board, title: 'In Progress', position: 2 },
  { board: board, title: 'Finished', position: 3 }
]

lists = lists_data.reduce({}) do |result, list_data|
  result[list_data[:title]] = List.create(list_data)
  result
end

# create cards
cards_data = [
  { list: lists['Chore List'], title: 'mow the lawn', position:  1, assignee: users['homer@sent.as'] },
  { list: lists['Chore List'], title: 'take out the trash', position:  2, assignee: users['homer@sent.as'] },
  { list: lists['Chore List'], title: 'animal rights rally', position:  3, assignee: users['lisa2@sent.as'] },
  { list: lists['Chore List'], title: 'write itchy & scratchy complaint letter', position: 4, assignee: users['marge@sent.as'] },
  { list: lists['In Progress'], title: 'drink beer and watch tv', position: 1, assignee: users['homer@sent.as'] },
  { list: lists['In Progress'], title: 'saxophone practice', position: 2, assignee: users['lisa2@sent.as'] },
  { list: lists['Finished'], title: 'do not have a cow', position: 1, assignee: users['bart@sent.as'] },
  { list: lists['Finished'], title: 'make pancakes!', position: 2, assignee: users['marge@sent.as'] },
  { list: lists['Finished'], title: 'shoot mr. burns', position: 3, assignee: users['maggie@sent.as'] },
]

cards = cards_data.reduce({}) do |result, card_data|
  result[card_data[:title]] = Card.create(card_data)
  result
end

# create card comments
card_comments_data = [
  { card: cards['saxophone practice'], commenter: users['marge@sent.as'], content: 'your playing sounds great lisa! :)' },
  { card: cards['write itchy & scratchy complaint letter'], commenter: users['bart@sent.as'], content: '¡ay, caramba! but, mom, this is my favorite show!' },
  { card: cards['shoot mr. burns'], commenter: users['marge@sent.as'], content: 'i know this was only an accident maggie. :(' },
  { card: cards['take out the trash'], commenter: users['marge@sent.as'], content: 'homer, honey, the trash is overflowing, please take it out soon.' },
  { card: cards['make pancakes!'], commenter: users['lisa2@sent.as'], content: 'they were delicious!' },
  { card: cards['animal rights rally'], commenter: users['lisa2@sent.as'], content: 'please comment here if you would like to join me.' },
  { card: cards['make pancakes!'], commenter: users['homer@sent.as'], content: 'thanks marge. :)' }
]

card_comments_data.map { |comment| CardComment.create(comment) }
