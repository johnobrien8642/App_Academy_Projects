require 'spec_helper'
require 'rails_helper'
user = FactoryBot.create(:user)
user2 = FactoryBot.create(:user)

feature "private goals" do
  
  background(:each) do 
    sign_in(user)
  end
  
  feature "in goals index" do
    scenario "cannot be seen by non-authors" do
      submit_new_goal("Lose ten pounds", user2, private: true)
      visit goals_url 
      
      expect(page).not_to have_content("Lose ten pounds")
    end
  
    scenario "can be seen by their authors" do
      submit_new_goal("Lose ten pounds", user, private: true)
      visit goals_url 
      
      expect(page).to have_content("Lose ten pounds")
    end
  end

  feature "in users show page" do
    scenario "cannot be seen by non-authors" do
      submit_new_goal("Lose ten pounds", user2, private: true)
      visit user_url(user2) 
      
      expect(page).not_to have_content("Lose ten pounds")
    end
  
    scenario "can be seen by their authors" do
      submit_new_goal("Lose ten pounds", user, private: true)
      visit user_url(user) 
      
      expect(page).to have_content("Lose ten pounds")
    end
  end
end

