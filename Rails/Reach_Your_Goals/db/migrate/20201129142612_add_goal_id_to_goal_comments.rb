class AddGoalIdToGoalComments < ActiveRecord::Migration[5.2]
  def change
    add_column :goal_comments, :goal_id, :integer, null: false
  end
end
