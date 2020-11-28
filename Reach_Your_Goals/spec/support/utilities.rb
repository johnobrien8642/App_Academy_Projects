def sign_in(user)
  visit new_session_url
  fill_in "Username", with: user.username
  fill_in "Password", with: user.password
  click_on "submit"
end