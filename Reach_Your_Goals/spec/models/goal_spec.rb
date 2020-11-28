require 'rails_helper'
require 'spec_helper'

RSpec.describe Goal, type: :model do

  describe "goal validations" do
    goal = Goal.new(user_id: 1, title: "New Goal") 
    it { should validate_presence_of(:user_id) }
    it { should validate_presence_of(:title) }
    it { should belong_to(:author) }

    it "should set private default to false" do 
      expect(goal.private).to eq(false)
    end

    it "should set completed default to false" do 
      expect(goal.completed).to eq(false)
    end
  end

  describe "Goal::find_by_title" do
    goal = FactoryBot.create(:goal)
    it "finds goal by title" do
      find_goal = Goal.find_by_title(goal.title)
      
      expect(find_goal.id).to eq(goal.id)
    end
  end
end
