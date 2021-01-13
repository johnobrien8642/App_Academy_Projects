require 'rails_helper'
require 'spec_helper'

RSpec.describe User, type: :model do
  describe "User validations" do
    subject { User.new(email: "great@scott.com", password: "thatisgreat") }
    it { should validate_presence_of(:email) }
    it { should validate_uniqueness_of(:email) }
    it { should validate_length_of(:password) }
    it { should validate_presence_of(:password_digest).
        with_message("Password can't be blank") }
    it { should validate_presence_of(:session_token) }
    it { should validate_uniqueness_of(:session_token) }
    it { should validate_presence_of(:activation_token) }
  end



  describe "self.find_by_credentials" do
    it "finds user when params are valid" do
      email = "chocolate@pudding.com"
      pw = "isgoodaf"
      user = User.create!(email: email, password: pw)
      find_user = User.find_by_credentials(email, pw)

      expect(find_user).to eq(user)
    end

    it "doesn't find user when params are invalid" do
      email = "abba@chicago.com"
      pw = "goodconcert"
      wrong_pw = "badconcert"
      user = User.create!(email: email, password: pw)
      find_user = User.find_by_credentials(email, wrong_pw)

      expect(find_user).to_not eq(user)
    end
  end

  describe "password=" do
    it "produces different digests for users using same password" do
      user1 = User.new(email: "another@one.com", password: "anotherone")
      user2 = User.new(email: "another2@one.com", password: "anotherone")
      expect(user1.password_digest).to_not eq(user2.password_digest)
    end
  end

  describe "is_password?" do
    it "return true when a users password is correct" do
    user = User.new(email: "moms@spaghetti.com", password: "kneesweak")

    expect(user.is_password?("kneesweak")).to be(true)
    end
  end
end
