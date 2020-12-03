require 'spec_helper'
require 'rails_helper'

feature "comments" do
  user = FactoryBot.create(:user)
  commenter = FactoryBot.create(:user)
  
  incomplete_goal = FactoryBot.create(:goal, user_id: user.id, completed: false, private: false)
  complete_goal = FactoryBot.create(:goal, user_id: user.id, completed: true, private: false)
  
  incomplete_goal_comment = FactoryBot.create(:goal_comment, 
    author_id: commenter.id, goal_id: incomplete_goal.id)
  complete_goal_comment = FactoryBot.create(:goal_comment, 
    author_id: commenter.id, goal_id: complete_goal.id)  
  
  user_comment = FactoryBot.create(:user_comment, 
    author_id: commenter.id, user_id: user.id)

  background(:each) do 
    sign_in(user)
  end

  feature "on users" do
    scenario "appear on users show page" do
      visit user_url(user)
      
      save_and_open_page
      expect(page).to have_content(user_comment.content)
    end
  end

  feature "on goals" do
    scenario "appear on users show page" do
      visit user_url(user)

      expect(page).to have_content(incomplete_goal_comment.content)
      expect(page).to have_content(complete_goal_comment.content)
    end
  end
end