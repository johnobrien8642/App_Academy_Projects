class Tag < ApplicationRecord
  validates :name, presence: true
  
  has_many :todos, 
    through: :taggings, 
    source: :todo
end
