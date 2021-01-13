class AddUserCheersColToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :user_cheers, :integer, null: false, default: 5
  end
end
