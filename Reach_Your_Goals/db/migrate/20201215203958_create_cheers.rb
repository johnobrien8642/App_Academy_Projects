class CreateCheers < ActiveRecord::Migration[5.2]
  def change
    create_table :cheers do |t|
      t.integer :user_id, null: false
      t.references :cheerable, polymorphic: true
      t.timestamps
    end
  end
end
