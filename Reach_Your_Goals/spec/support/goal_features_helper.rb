
module GoalFeaturesHelper
  
  def sign_in(user)
    visit new_session_url
    fill_in "Username", with: user.username
    fill_in "Password", with: user.password
    click_on "submit"
  end

  def submit_new_goal(goal_title, user, privacy = {private: false})
    visit new_user_goal_url(user)
    fill_in "Title", with: goal_title
    if privacy[:private]
      choose "Yes"
    end
    click_on "submit"
  end

  def make_three_goals(user)
    FactoryBot.create(:goal, title: "Lose ten pounds", author: user)
    FactoryBot.create(:goal, title: "Lose twenty pounds", author: user)
    FactoryBot.create(:goal, title: "Lose thirty pounds", author: user)
  end

  def verify_three_goals
    visit goals_url
    expect(page).to have_content "Lose ten pounds"
    expect(page).to have_content "Lose twenty pounds"
    expect(page).to have_content "Lose thirty pounds"
  end

end