require 'spec_helper'
require 'rails_helper'

feature "comments" do

  user = FactoryBot.create(:user)
  commenter = FactoryBot.create(:user)
  
  incompleted_goal = FactoryBot.create(:goal, user_id: user.id, completed: false, private: false)
  completed_goal = FactoryBot.create(:goal, user_id: user.id, completed: true, private: false)
  
  comment = FactoryBot.build(:comment)  

  background(:each) do 
    sign_in(commenter)
  end

  feature "on users" do
    scenario "appear on users show page" do
      post_new_user_comment(comment.content, user)
      
      expect(page).to have_content(comment.content)
    end
  end

  feature "on goals" do
    feature "that are completed" do
      scenario "appear on users show page" do
        post_new_completed_goal_comment(comment.content, user)
        
        expect(page).to have_content(comment.content)
      end
    end

    feature "that are incompleted" do
      scenario "appear on users show page" do
        post_new_incompleted_goal_comment(comment.content, user)

        expect(page).to have_content(comment.content)
      end
    end
  end

  feature "delete button" do
    feature "for user comments" do
      scenario "shows when author is logged in" do 
        post_new_user_comment(comment.content, user)
  
        expect(page).to have_css(".comment_delete_button")
      end

      scenario "does not show when author is not logged in" do
        post_new_user_comment(comment.content, user)
        click_on "Log out"
        sign_in(user)
        
        expect(page).not_to have_css(".comment_delete_button")
      end
    end
    
    feature "for incompleted goal comments" do
      scenario "shows when author is logged in" do 
        post_new_incompleted_goal_comment(comment.content, user)
  
        expect(page).to have_css(".comment_delete_button")
      end

      scenario "does not show when author is not logged in" do
        post_new_incompleted_goal_comment(comment.content, user)
        click_on "Log out"
        sign_in(user)
        visit user_url(user)
        
        expect(page).not_to have_css(".comment_delete_button")
      end
    end

    feature "for completed goal comments" do
      scenario "shows when author is logged in" do 
        post_new_completed_goal_comment(comment.content, user)
        
        expect(page).to have_css(".comment_delete_button")
      end

      scenario "does not show when author is not logged in" do
        post_new_completed_goal_comment(comment.content, user)
        click_on "Log out"
        sign_in(user)
        visit user_url(user)

        expect(page).not_to have_css(".comment_delete_button")
      end
    end
    
    feature "are removed when delete is clicked" do
      scenario "for user comments" do
        post_new_user_comment(comment.content, user)
        
        click_on(class: 'comment_delete_button')
        expect(page).not_to have_css(".comment_delete_button")
      end

      scenario "for incomplete goal comments" do
        post_new_incompleted_goal_comment(comment.content, user)
        
        click_on(class: 'comment_delete_button')
        expect(page).not_to have_css(".comment_delete_button")
      end

      scenario "for completed comments" do
        post_new_completed_goal_comment(comment.content, user)
        
        click_on(class: 'comment_delete_button')
        expect(page).not_to have_css(".comment_delete_button")
      end
    end
  end
end