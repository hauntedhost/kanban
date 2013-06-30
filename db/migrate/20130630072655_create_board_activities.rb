class CreateBoardActivities < ActiveRecord::Migration
  def change
    create_table :board_activities do |t|
      t.integer :member_id, :null => false
      t.integer :board_id, :null => false
      t.text :description, :null => false
      t.timestamps
    end
    add_index :board_activities, :board_id
  end
end
