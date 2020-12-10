class Goal < ApplicationRecord
    include Commentable
    
    validates :user_id, :title, presence: true

    belongs_to :author,
      class_name: :User,
      foreign_key: :user_id

    def self.find_by_title(title)
      Goal.find_by(title: title)    
    end

    def toggle_completed!
      self.toggle!(:completed)
    end
end
