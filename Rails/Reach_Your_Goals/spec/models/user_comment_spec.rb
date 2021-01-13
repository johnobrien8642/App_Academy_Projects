require 'rails_helper'

RSpec.describe UserComment, type: :model do
  it { should validate_presence_of(:author_id) }
  it { should validate_presence_of(:content) }
  it { should validate_presence_of(:user_id) }
  it { should belong_to(:author) }
  it { should belong_to(:user) }
end
