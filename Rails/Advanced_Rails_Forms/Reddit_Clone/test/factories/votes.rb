FactoryBot.define do
  factory :vote do
    user_id { 1 }
    value { 1 }
    votable { nil }
  end
end
