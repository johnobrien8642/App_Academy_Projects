require 'spec_helper'
require 'rails_helper'

feature "comments" do
  user = FactoryBot.create(:user)
  commenter = FactoryBot.create(:user)
  
  incompleted_goal = FactoryBot.create(:goal, user_id: user.id, completed: false, private: false)
  completed_goal = FactoryBot.create(:goal, user_id: user.id, completed: true, private: false)
  
  incompleted_goal_comment = FactoryBot.create(:goal_comment, 
    author_id: commenter.id, goal_id: incompleted_goal.id)
  completed_goal_comment = FactoryBot.create(:goal_comment, 
    author_id: commenter.id, goal_id: completed_goal.id)  
  
  user_comment = FactoryBot.create(:user_comment, 
    author_id: commenter.id, user_id: user.id)

  background(:each) do 
    sign_in(user)
  end

  feature "on users" do
    scenario "appear on users show page" do
      post_new_user_comment(user_comment.content, user)
      
      expect(page).to have_content(user_comment.content)
    end
  end

  feature "on goals" do
    scenario "appear on users show page" do
      post_new_completed_goal_comment(completed_goal_comment.content, user)
      post_new_incompleted_goal_comment(incompleted_goal_comment.content, user)
      
      expect(page).to have_content(completed_goal_comment.content)
      expect(page).to have_content(incompleted_goal_comment.content)
    end
  end
end