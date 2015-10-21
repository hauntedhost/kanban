Board.create([
  { :name => "final project", :description => "meta-kanban for this kanban app", :open => true },
  { :name => "second app", :description => "my second app academy app", :open => true },
  { :name => "dev job", :description => "job search board", :open => true },
  { :name => "Simpson Family Chores", :description => "Chores manager for Simpson family", :open => true }
])

BoardMember.create([
  { :board_id => 1, :member_id => 1, :admin => false },
  { :board_id => 1, :member_id => 2, :admin => false },
  { :board_id => 1, :member_id => 3, :admin => false },
  { :board_id => 2, :member_id => 1, :admin => false },
  { :board_id => 3, :member_id => 1, :admin => false },
  { :board_id => 4, :member_id => 4, :admin => false },
  { :board_id => 4, :member_id => 5, :admin => false },
  { :board_id => 4, :member_id => 6, :admin => false },
  { :board_id => 4, :member_id => 7, :admin => false },
  { :board_id => 4, :member_id => 8, :admin => false }
])

Card.create([
  { :list_id => 8, :title => "saxophone practice", :description => nil, :due_date => nil, :open => true, :position => 1, :assignee_id => 7 },
  { :list_id => 7, :title => "mow the lawn", :description => nil, :due_date => nil, :open => true, :position => 1, :assignee_id => 4 },
  { :list_id => 8, :title => "drink beer and watch tv", :description => nil, :due_date => nil, :open => true, :position => 2, :assignee_id => 4 },
  { :list_id => 7, :title => "take out the trash", :description => nil, :due_date => nil, :open => true, :position => 2, :assignee_id => 4 },
  { :list_id => 7, :title => "animal rights rally", :description => nil, :due_date => nil, :open => true, :position => 3, :assignee_id => 7 },
  { :list_id => 7, :title => "write itchy & scratchy complaint letter", :description => nil, :due_date => nil, :open => true, :position => 4, :assignee_id => 5 },
  { :list_id => 9, :title => "do not have a cow", :description => nil, :due_date => nil, :open => true, :position => 6, :assignee_id => 6 },
  { :list_id => 9, :title => "make pancakes!", :description => nil, :due_date => nil, :open => true, :position => 7, :assignee_id => 5 },
  { :list_id => 9, :title => "shoot mr. burns", :description => nil, :due_date => nil, :open => true, :position => 8, :assignee_id => 8 },

  { :list_id => 1, :title => "pass lists/cards with board", :description => nil, :due_date => nil, :open => true, :position => 1, :assignee_id => 1 },
  { :list_id => 3, :title => "add boards index", :description => nil, :due_date => nil, :open => true, :position => 2, :assignee_id => 3 },
  { :list_id => 3, :title => "add boards show", :description => nil, :due_date => nil, :open => true, :position => 3, :assignee_id => nil },
  { :list_id => 4, :title => "chains.cc", :description => nil, :due_date => nil, :open => true, :position => 4, :assignee_id => nil }
])

CardComment.create([
  { :card_id => 1, :commenter_id => 5, :content => "your playing sounds great lisa! :)"  },
  { :card_id => 6, :commenter_id => 6, :content => "¡ay, caramba! but, mom, this is my favorite show!" },
  { :card_id => 9, :commenter_id => 5, :content => "i know this was only an accident maggie. :(" },
  { :card_id => 4, :commenter_id => 5, :content => "homer, honey, the trash is overflowing, please take it out soon." },
  { :card_id => 8, :commenter_id => 7, :content => "they were delicious!" },
  { :card_id => 5, :commenter_id => 7, :content => "please comment here if you would like to join me." },
  { :card_id => 8, :commenter_id => 4, :content => "thanks marge. :)" },

  { :card_id => 10, :commenter_id => 1, :content => "nice" },
  { :card_id => 10, :commenter_id => 1, :content => "will do this soon" },
  { :card_id => 10, :commenter_id => 1, :content => "hello world" }
])

List.create([
  { :board_id => 1, :title => "todo", :open => true, :position => 1 },
  { :board_id => 1, :title => "in progress", :open => true, :position => 2 },
  { :board_id => 1, :title => "finished", :open => true, :position => 3 },
  { :board_id => 2, :title => "ideas", :open => true, :position => 4 },
  { :board_id => 3, :title => "apply", :open => true, :position => 5 },
  { :board_id => 3, :title => "applied", :open => true, :position => 6 },
  { :board_id => 4, :title => "Chore List", :open => true, :position => 7 },
  { :board_id => 4, :title => "In Progress", :open => true, :position => 8 },
  { :board_id => 4, :title => "Finished", :open => true, :position => 9 }
])

User.create([
  { :username => nil, :email => "somlor@gmail.com", :password => "123", :password_confirmation => "123", :session_key => nil, :activation_key => nil, :bio => "Rails hacker", :full_name => "Sean Omlor" },
  { :username => nil, :email => "sebastian@catmail.com", :password => "123", :password_confirmation => "123", :session_key => nil, :activation_key => nil, :bio => "Strange cat", :full_name => "Sebastian" },
  { :username => nil, :email => "alli.crwfrd@gmail.com", :password => "123", :password_confirmation => "123", :session_key => nil, :activation_key => nil, :bio => "Banana slug", :full_name => "Alli" },
  { :username => nil, :email => "homer@sent.as", :password => "123", :password_confirmation => "123", :session_key => nil, :activation_key => nil, :bio => "Homer Simpson", :full_name => "Homer" },
  { :username => nil, :email => "marge@sent.as", :password => "123", :password_confirmation => "123", :session_key => nil, :activation_key => nil, :bio => "Marge Simpson", :full_name => "Marge" },
  { :username => nil, :email => "bart@sent.as", :password => "123", :password_confirmation => "123", :session_key => nil, :activation_key => nil, :bio => "Bart Simpson", :full_name => "Bart" },
  { :username => nil, :email => "lisa2@sent.as", :password => "123", :password_confirmation => "123", :session_key => nil, :activation_key => nil, :bio => "Lisa Simpson", :full_name => "Lisa" },
  { :username => nil, :email => "maggie@sent.as", :password => "123", :password_confirmation => "123", :session_key => nil, :activation_key => nil, :bio => "Maggie Simpson", :full_name => "Maggie" }
])