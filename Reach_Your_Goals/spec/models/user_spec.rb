require 'rails_helper'
require 'spec_helper'

RSpec.describe User, type: :model do
  describe "User validations" do 
    subject { User.new(username: "BillabongBen", password: "surfsup") }
    it { should validate_presence_of(:username) }
    it { should validate_uniqueness_of(:username) }
    it { should validate_presence_of(:password_digest) }
    it { should validate_length_of(:password_digest) }
    it { should validate_presence_of(:session_token) }
    it { should validate_uniqueness_of(:session_token) }
  end

  describe "User::find_by_credentials" do
    it "finds user with valid params" do 
      username = "jacksparrow1"
      password = "jacksparrow1"
      user = User.create!(username: username, password: password)
      find_user = User.find_by_credentials(username, password)

      expect(user).to eq(find_user)
    end

    it "returns null with invalid params" do
      username = "jacksparrow2"
      password = "jacksparrow2"
      wrong_password = ""
      user = User.create!(username: username, password: password)
      find_user = User.find_by_credentials(username, wrong_password)

      expect(find_user).to be(nil)
    end
  end
end
