class ChangeCheersColUserIdtoCelebrator < ActiveRecord::Migration[5.2]
  def change
    rename_column :cheers, :user_id, :celebrator_id
  end
end
