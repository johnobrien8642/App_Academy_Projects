FactoryBot.define do
  factory :comment do
    content { "MyText" }
    author_id { 1 }
    post_id { 1 }
  end
end
