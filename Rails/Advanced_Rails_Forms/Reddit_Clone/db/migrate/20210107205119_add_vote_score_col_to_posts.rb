class AddVoteScoreColToPosts < ActiveRecord::Migration[5.2]
  def change
    add_column :posts, :vote_score, :integer, default: 0
  end
end
