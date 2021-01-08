class Vote < ApplicationRecord
    validates :user_id, presence: true

    belongs_to :votable, polymorphic: true
end