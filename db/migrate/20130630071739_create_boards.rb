class CreateBoards < ActiveRecord::Migration
  def change
    create_table :boards do |t|
      t.string :name
      t.string :description
      t.boolean :open, :null => false, :default => true
      t.timestamps
    end
    add_index :boards, :open
  end
end
