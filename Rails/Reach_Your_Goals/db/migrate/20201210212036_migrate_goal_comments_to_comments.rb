class MigrateGoalCommentsToComments < ActiveRecord::Migration[5.2]
  def change
    GoalComment.all.each do |c|
      comment = Comment.new(
        author_id: c.author_id,
        content: c.content,
        commentable_type: "Goal",
        commentable_id: c.goal_id
      )
      comment.save!
    end
  end
end
