class AddVoteScoreColToComments < ActiveRecord::Migration[5.2]
  def change
    add_column :comments, :vote_score, :integer, default: 0
  end
end
