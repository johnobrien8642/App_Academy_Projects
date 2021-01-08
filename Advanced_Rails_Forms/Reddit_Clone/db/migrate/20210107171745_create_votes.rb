class CreateVotes < ActiveRecord::Migration[5.2]
  def change
    create_table :votes do |t|
      t.integer :user_id, null: false
      t.integer :value
      t.references :votable, polymorphic: true

      t.timestamps
    end

    add_index :votes, :user_id
  end
end
