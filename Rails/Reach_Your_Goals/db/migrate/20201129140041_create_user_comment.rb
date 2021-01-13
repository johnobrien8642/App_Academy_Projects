class CreateUserComment < ActiveRecord::Migration[5.2]
  def change
    create_table :user_comments do |t|
      t.integer :author_id, null: false
      t.text :content, null: false

      t.timestamps
    end

    add_index :user_comments, :author_id
  end
end
