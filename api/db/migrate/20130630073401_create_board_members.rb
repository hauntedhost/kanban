class CreateBoardMembers < ActiveRecord::Migration
  def change
    create_table :board_members do |t|
      t.integer :board_id, :null => false
      t.integer :member_id, :null => false
      t.boolean :admin, :null => false, :default => false
      t.timestamps
    end
    add_index :board_members, :board_id
    add_index :board_members, [:board_id, :member_id], :unique => true
  end
end
