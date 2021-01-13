require 'rails_helper'
require 'spec_helper'

RSpec.describe Cheer, type: :model do
  it { should validate_presence_of(:user_id) }
  it { should belong_to(:cheerable) }
  it { should belong_to(:user) }
end
