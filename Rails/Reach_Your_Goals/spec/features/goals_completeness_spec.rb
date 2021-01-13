require 'spec_helper'
require 'rails_helper'
user = FactoryBot.create(:user)

feature "goals" do
    background(:each) do 
      sign_in(user)
    end
    feature "when created" do
      scenario "are marked incomplete by default" do
        submit_new_goal("Run a mile", user)
        
        expect(page).to have_content("No")    
      end

      scenario "are added to incomplete list on users show page" do
        submit_new_goal("Run a mile", user)
        visit user_url(user)
        
        expect(page).to have_content("Incomplete goals")
        expect(page).to have_content("Run a mile")
        expect(page).to have_content("No")
      end
    end

   feature "when marked complete by their author" do
      scenario "are moved from the incomplete list to the complete list" do
        submit_new_goal("Run a mile", user)
        user_marks_goal_complete(user)
       
        expect(page).to have_content("Completed goals")  
        expect(page).to have_content("Run a mile")
        expect(page).to have_content("Yes")
      end

      scenario "are noted complete on the goals index page" do
        submit_new_goal("Run a mile", user)
        user_marks_goal_complete(user)
        visit goals_url
    
        expect(page).to have_content("Yes")
      end   
    end
end