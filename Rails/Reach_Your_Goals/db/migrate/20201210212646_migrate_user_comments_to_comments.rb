class MigrateUserCommentsToComments < ActiveRecord::Migration[5.2]
  def change
    UserComment.all.each do |c|
      comment = Comment.new(
        author_id: c.author_id,
        content: c.content,
        commentable_type: "User",
        commentable_id: c.user_id
      )
      comment.save!
    end
  end
end
