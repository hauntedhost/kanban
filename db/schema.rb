# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20130630080303) do

  create_table "board_activities", :force => true do |t|
    t.integer  "member_id",   :null => false
    t.integer  "board_id",    :null => false
    t.text     "description", :null => false
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
  end

  add_index "board_activities", ["board_id"], :name => "index_board_activities_on_board_id"

  create_table "board_members", :force => true do |t|
    t.integer  "board_id",                      :null => false
    t.integer  "member_id",                     :null => false
    t.boolean  "admin",      :default => false, :null => false
    t.datetime "created_at",                    :null => false
    t.datetime "updated_at",                    :null => false
  end

  add_index "board_members", ["board_id", "member_id"], :name => "index_board_members_on_board_id_and_member_id", :unique => true
  add_index "board_members", ["board_id"], :name => "index_board_members_on_board_id"

  create_table "boards", :force => true do |t|
    t.string   "name"
    t.string   "description"
    t.boolean  "open",        :default => true, :null => false
    t.datetime "created_at",                    :null => false
    t.datetime "updated_at",                    :null => false
  end

  add_index "boards", ["open"], :name => "index_boards_on_open"

  create_table "card_activities", :force => true do |t|
    t.integer  "member_id",   :null => false
    t.integer  "card_id",     :null => false
    t.text     "description", :null => false
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
  end

  add_index "card_activities", ["card_id"], :name => "index_card_activities_on_card_id"

  create_table "card_comments", :force => true do |t|
    t.integer  "card_id",      :null => false
    t.integer  "commenter_id", :null => false
    t.text     "content"
    t.datetime "created_at",   :null => false
    t.datetime "updated_at",   :null => false
  end

  add_index "card_comments", ["card_id"], :name => "index_card_comments_on_card_id"

  create_table "card_members", :force => true do |t|
    t.integer  "card_id",    :null => false
    t.integer  "member_id",  :null => false
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "card_members", ["card_id", "member_id"], :name => "index_card_members_on_card_id_and_member_id", :unique => true
  add_index "card_members", ["card_id"], :name => "index_card_members_on_card_id"

  create_table "cards", :force => true do |t|
    t.integer  "list_id",                       :null => false
    t.string   "title",                         :null => false
    t.text     "description"
    t.datetime "due_date"
    t.boolean  "open",        :default => true, :null => false
    t.datetime "created_at",                    :null => false
    t.datetime "updated_at",                    :null => false
  end

  add_index "cards", ["list_id"], :name => "index_cards_on_list_id"

  create_table "lists", :force => true do |t|
    t.integer  "board_id",                     :null => false
    t.string   "title"
    t.boolean  "open",       :default => true, :null => false
    t.datetime "created_at",                   :null => false
    t.datetime "updated_at",                   :null => false
  end

  add_index "lists", ["board_id"], :name => "index_lists_on_board_id"

  create_table "users", :force => true do |t|
    t.string   "username"
    t.string   "email",           :null => false
    t.string   "password_digest"
    t.string   "session_key"
    t.string   "activation_key"
    t.string   "bio"
    t.datetime "created_at",      :null => false
    t.datetime "updated_at",      :null => false
  end

  add_index "users", ["session_key"], :name => "index_users_on_session_key"

end
