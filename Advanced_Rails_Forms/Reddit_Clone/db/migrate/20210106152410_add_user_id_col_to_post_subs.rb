class AddUserIdColToPostSubs < ActiveRecord::Migration[5.2]
  def change 
    add_column :post_subs, :user_id, :integer, null: false
  end
end
