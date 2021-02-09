class AddPictureUrlToBenches < ActiveRecord::Migration[5.2]
  def change
    add_column :benches, :picture_url, :string
  end
end
