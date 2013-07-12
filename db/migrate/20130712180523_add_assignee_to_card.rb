class AddAssigneeToCard < ActiveRecord::Migration
  def change
    add_column :cards, :assignee_id, :integer
  end
end
