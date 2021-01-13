class Comment < ApplicationRecord
    validates :content, presence: true

    attr_reader :commentable_id, :commentable_type
    
    belongs_to :commentable, polymorphic: true
    
    belongs_to :author,
      class_name: :User,
      foreign_key: :author_id
end