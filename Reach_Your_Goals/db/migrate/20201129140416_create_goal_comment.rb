class CreateGoalComment < ActiveRecord::Migration[5.2]
  def change
    create_table :goal_comments do |t|
      t.integer :author_id, null: false
      t.text :content, null: false

      t.timestamps
    end

    add_index :goal_comments, :author_id
  end
end
