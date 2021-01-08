class Sub < ApplicationRecord
    validates :title, :description, presence: true
    validates :title, uniqueness: { scope: :creator_id }

    belongs_to :moderator,
        foreign_key: :creator_id,
        class_name: :User
    
    has_many :post_subs, dependent: :destroy, inverse_of: :sub    
    has_many :posts, through: :post_subs

    has_many :subscriptions, dependent: :destroy, inverse_of: :sub
    has_many :subscribers, through: :subscriptions, source: :user
end
