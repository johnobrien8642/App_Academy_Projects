require 'spec_helper'
require 'rails_helper'

feature 'the signup process' do
  scenario 'has a new user page' do
    visit new_user_url
    expect(page).to have_content('Sign up')
  end

  feature 'signing up a user' do
    scenario 'shows username on the homepage after signup' do
      
      visit new_user_url
      fill_in("username", with: "testuser")
      fill_in("password", with: "password")
      click_on("submit")

      expect(page).to have_content("testuser")
    end
  end
end

feature 'logging in' do
  scenario 'shows username on the homepage after login' do
    user = User.create(username: "newuser2", password: "password")
    visit new_session_url
    fill_in("username", with: "newuser2")
    fill_in("password", with: "password")
    click_on("submit")
    
    expect(page).to have_content("newuser2")
  end
  

end

feature 'logging out' do
  scenario 'begins with a logged out state' do
    visit new_session_url

    expect(page).to have_content('Log in')
  end

  scenario 'doesn\'t show username on the homepage after logout' do
    user = User.create(username: "newuser3", password: "password")
    visit new_session_url
    fill_in("username", with: "newuser3")
    fill_in("password", with: "password")
    click_on("submit")
    click_on("Log out")
 
    expect(page).not_to have_content("newuser3")
  end
end