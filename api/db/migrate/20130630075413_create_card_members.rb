class CreateCardMembers < ActiveRecord::Migration
  def change
    create_table :card_members do |t|
      t.integer :card_id, :null => false
      t.integer :member_id, :null => false
      t.timestamps
    end
    add_index :card_members, :card_id
    add_index :card_members, [:card_id, :member_id], :unique => true
  end
end
