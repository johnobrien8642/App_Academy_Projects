class Cheer < ApplicationRecord
  validates :celebrator_id, presence: true

  attr_reader :cheerable_id, :cheerable_type
  
  belongs_to :cheerable, polymorphic: true

  belongs_to :celebrator,
    class_name: :User,
    foreign_key: :celebrator_id
end