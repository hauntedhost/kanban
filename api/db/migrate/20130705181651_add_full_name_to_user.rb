class AddFullNameToUser < ActiveRecord::Migration
  def change
    add_column :users, :full_name, :string
  end
end
