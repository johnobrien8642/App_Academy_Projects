require 'spec_helper'
require 'rails_helper'

feature "cheers" do 
  
  user = FactoryBot.create(:user)
  user2 = FactoryBot.create(:user)
  
  incomplete_goal = FactoryBot.create(:goal, user_id: user.id, completed: false, private: false)
  complete_goal = FactoryBot.create(:goal, user_id: user.id, completed: true, private: false)

  feature "can be given" do
    background(:each) do
      sign_in(user)
    end
    
    scenario "to users" do 
      visit user_url(user)

      click_on(class: 'user_cheer_button')
      
      expect(page).to have_content(1)
      expect(page).to have_content("Cheers!")
    end
    
    scenario "to incompleted goals" do
      visit user_url(user)
      
      click_on(class: 'incompleted_goal_cheer_button')
      expect(page).to have_content(1)
      expect(page).to have_content("Cheers!")
    end

    scenario "to completed goals" do
      visit user_url(user)
      
      click_on(class: 'completed_goal_cheer_button')
      expect(page).to have_content(1)
      expect(page).to have_content("Cheers!")
      save_and_open_page
    end
  end
end