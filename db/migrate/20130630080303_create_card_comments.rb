class CreateCardComments < ActiveRecord::Migration
  def change
    create_table :card_comments do |t|
      t.integer :card_id, :null => false
      t.integer :commenter_id, :null => false
      t.text :content
      t.timestamps
    end
    add_index :card_comments, :card_id
  end
end
