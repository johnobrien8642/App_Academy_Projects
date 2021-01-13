require 'rails_helper'
require 'spec_helper'

RSpec.describe Comment, type: :model do
  describe "comment validations" do
    it { should validate_presence_of(:content) }
    it { should belong_to(:commentable) }
    it { should belong_to(:author)}
  end
end
