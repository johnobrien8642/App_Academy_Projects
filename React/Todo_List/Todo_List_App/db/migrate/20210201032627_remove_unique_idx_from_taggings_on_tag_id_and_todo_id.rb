class RemoveUniqueIdxFromTaggingsOnTagIdAndTodoId < ActiveRecord::Migration[5.2]
  def change
    remove_index :taggings, [ :todo_id, :tag_id ]
  end
end
