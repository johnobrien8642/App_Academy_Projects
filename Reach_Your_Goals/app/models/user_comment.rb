class UserComment < ApplicationRecord
  validates :author_id, :user_id, :content, presence: true

  belongs_to :author,
    class_name: :User,
    foreign_key: :author_id

  belongs_to :user,
    class_name: :User,
    foreign_key: :user_id
end