class CreateCardActivities < ActiveRecord::Migration
  def change
    create_table :card_activities do |t|
      t.integer :member_id, :null => false
      t.integer :card_id, :null => false
      t.text :description, :null => false
      t.timestamps
    end
    add_index :card_activities, :card_id
  end
end
