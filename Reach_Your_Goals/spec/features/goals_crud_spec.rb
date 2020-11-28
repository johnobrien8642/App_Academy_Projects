require 'spec_helper'
require 'rails_helper'
require 'support/utilities'

user = FactoryBot.create(:user)

feature "the new goal process" do
  scenario "has a new goal page" do 
    sign_in(user)
    visit new_user_goal_url(user)
    
    expect(page).to have_content('Add New Goal')
  end
  
  feature "creating a new goal" do
    scenario "adds goal to users show page" do
      sign_in(user)
      visit user_url(user)
      click_on("Add New Goal")

      fill_in "Title", with: "Lose ten pounds"
      fill_in "Description", with: "I need to lose ten pounds!"
      choose "No"
      click_on "submit"

      expect(page).to have_content("Lose ten pounds")
    end
  end

end

feature "examining a single goal" do
  scenario "has an individual goal show page" do
    sign_in(user)
    visit user_url(user)
    click_on("Add New Goal")

    fill_in "Title", with: "Lose twenty pounds"
    fill_in "Description", with: "I need to lose twenty pounds!"
    choose "No"
    click_on "submit"

    click_on "Lose twenty pounds"

    expect(page).to have_content("Lose twenty pounds")
  end
end

feature "updating a goal" do
  scenario "has a goal update page" do
    sign_in(user)
    visit user_url(user)
    click_on("Add New Goal")

    fill_in "Title", with: "Lose thirty pounds"
    fill_in "Description", with: "I need to lose thirty pounds!"
    choose "No"
    click_on "submit"

    click_on "Lose thirty pounds"

    click_on "Edit"

    expect(page).to have_content("Edit Goal")
  end
  
  scenario "redirects back to goal show page on success" do
    sign_in(user)
    visit user_url(user)
    click_on("Add New Goal")

    fill_in "Title", with: "Lose thirty pounds"
    fill_in "Description", with: "I need to lose thirty pounds!"
    choose "No"
    click_on "submit"

    click_on "Lose thirty pounds"

    click_on "Edit"

    fill_in "Title", with: "Lose thirty pounds!"
    click_on "submit"

    expect(page).to have_content("Lose thirty pounds!")
  end

end

feature "destroying a goal" do 
  scenario "redirects to users show page on success" do
    sign_in(user)
    visit user_url(user)
    click_on("Add New Goal")

    fill_in "Title", with: "Lose forty pounds"
    fill_in "Description", with: "I need to lose forty pounds!"
    choose "No"
    click_on "submit"

    click_on "Delete"

    expect(page).to have_content("Goals")
  end
end