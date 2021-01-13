class AddGoalIdToUserComments < ActiveRecord::Migration[5.2]
  def change
    add_column :user_comments, :user_id, :integer, null: false
  end
end
