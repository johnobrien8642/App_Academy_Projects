require 'spec_helper'
require 'rails_helper'


feature "CRUD of goals" do
  user = FactoryBot.create(:user)
  
  background(:each) do 
    sign_in(user)
  end
  
  feature "the new goal process" do
    scenario "has a new goal page" do 
      visit new_user_goal_url(user)
      
      expect(page).to have_content('Add New Goal')
    end
    
    feature "creating a new goal" do
      scenario "adds goals to goals index" do
        make_three_goals(user)
      
        verify_three_goals
      end
      
      scenario "adds goal to users show page" do
        submit_new_goal("Lose ten pounds", user)
        visit user_url(user)

        expect(page).to have_content(user.username)
        expect(page).to have_content("Lose ten pounds")
      end
    end
  end
  
  feature "examining a single goal" do
    scenario "has an individual goal show page" do
      submit_new_goal("Lose ten pounds", user)
      click_on "Lose ten pounds"
  
      expect(page).to have_content("Lose ten pounds")
    end
  end
  
  feature "updating a goal" do
    scenario "has a goal update page" do
      submit_new_goal("Lose ten pounds", user)
      click_on "Lose ten pounds"
      click_on "Edit"
  
      expect(page).to have_content("Edit Goal")
    end
    
    scenario "redirects back to goal show page on success" do
      submit_new_goal("Lose ten pounds", user)
      click_on "Lose ten pounds"
      click_on "Edit"
  
      fill_in "Title", with: "Lose ten pounds!"
      click_on "submit"
  
      expect(page).to have_content("Lose ten pounds!")
    end
  
  end
  
  feature "destroying a goal" do 
    scenario "redirects to users show page on success" do
      submit_new_goal("Lose ten pounds", user)
      click_on "Delete"
  
      expect(page).to have_content("Goals")
    end
  end
end