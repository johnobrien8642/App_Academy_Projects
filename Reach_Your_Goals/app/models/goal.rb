class Goal < ApplicationRecord
    validates :user_id, :title, presence: true

    after_initialize :set_defaults

    belongs_to :author,
      class_name: :User,
      foreign_key: :user_id

    def self.find_by_title(title)
      Goal.find_by(title: title)    
    end

    private

    def set_defaults
      self.private ||= false
      self.completed ||= false
    end
end
