class CreateComments < ActiveRecord::Migration[5.2]
  def change
    create_table :comments do |t|
      t.integer :author_id, null: false
      t.text :content, null: false
      t.references :commentable, polymorphic: true
      t.timestamps
    end
  end
end
