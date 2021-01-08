class RemoveUserIdColFromPostSubs < ActiveRecord::Migration[5.2]
  def change
    remove_column :post_subs, :user_id
  end
end
