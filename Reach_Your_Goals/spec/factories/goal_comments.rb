FactoryBot.define do
  factory :goal_comment do
    content { Faker::Lorem.sentence(word_count: 5) }
  end
end
