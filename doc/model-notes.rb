User
username:string
email:string
password_digest:string
session_key:string
activation_key:string
bio:string

has_many :boards_members, :class_name => "BoardMember", :foreign_key => :member_id
has_many :boards, :through => :board_ids

has_many :cards_members, :class_name => "CardMember", :foreign_key => :member_id
has_many :cards, :through => :cards_members

Board
name:string
description:string
# visibility:string %w[private public]
open:boolean

has_many :boards_members, :class_name => "BoardMember"
has_many :members, :through => :member_ids

has_many :board_activities

BoardActivity
member_id:integer
board_id:integer
description:text

belongs_to :member, :class_name => "User"
belongs_to :board

BoardMember
board_id:integer
member_id:integer
admin:boolean
#role:string %w[normal admin]

belongs_to :board
belongs_to :member, :class_name => "User"
has_many :lists

validates_uniqueness_of :board_id, :scope => [:board_id, :member_id] 
validates_uniqueness_of :member_id, :scope => [:member_id, :board_id] 

List
board_id:integer
title:string
open:boolean

belongs_to :board
has_many :cards

Card
list_id:integer
title:string
description:text
due_date:datetime
open:boolean

belongs_to :list
has_one :board, :through => :list

has_many :cards_members, :class_name => "CardMember"
has_many :members, :through => :cards_members

has_many :card_comments
has_many :card_activities

CardActivity
member_id:integer
card_id:integer
description:text

belongs_to :member, :class_name => "User"
belongs_to :card

CardMember
card_id:integer
member_id:integer

belongs_to :card
belongs_to :member, :class_name => "User"

validates_uniqueness_of :card_id, :scope => [:card_id, :member_id]
validates_uniqueness_of :member_id, :scope => [:member_id, :card_id]

CardComment
card_id:integer
commenter_id:integer
content:text

belongs_to :card
belongs_to :commenter, :class_name => "User"


