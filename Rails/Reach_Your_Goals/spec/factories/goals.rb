FactoryBot.define do
  factory :goal do
    user_id { rand(1..100) }
    title { Faker::Lorem.sentence(word_count: 2) }
    description { Faker::Lorem.sentence(word_count: 5) }
    private { Faker::Boolean.boolean(true_ratio: 0.2) }
    completed { Faker::Boolean.boolean(true_ratio: 0.3) }
  end
end
