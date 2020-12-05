module CommentFeaturesHelper
    def post_new_user_comment(comment_content, user)
      visit user_url(user)
      fill_in "user_comment_content", with: comment_content
      click_on "user_comment_post"
    end
  
    def post_new_completed_goal_comment(comment_content, user)
      visit user_url(user)
      fill_in "completed_goal_comment_content", with: comment_content
      
      click_on "completed_goal_post"
    end
  
    def post_new_incompleted_goal_comment(comment_content, user)
      visit user_url(user)
      fill_in "incompleted_goal_comment_content", with: comment_content
      
      click_on "incompleted_goal_post"
    end
end