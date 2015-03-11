class AddPositionToCards < ActiveRecord::Migration
  def change
    add_column :cards, :position, :integer
  end
end
