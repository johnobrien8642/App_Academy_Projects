class ChangeTagsTagColToName < ActiveRecord::Migration[5.2]
  def change
    rename_column :tags, :tag, :name
  end
end
