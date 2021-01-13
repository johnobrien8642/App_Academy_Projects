class GoalComment < ApplicationRecord
  validates :author_id, :goal_id, :content, presence: true

  belongs_to :author,
    class_name: :User,
    foreign_key: :author_id

  belongs_to :goal,
    class_name: :Goal,
    foreign_key: :goal_id
end