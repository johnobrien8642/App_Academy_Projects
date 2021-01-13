class Tag < ApplicationRecord
  
  attr_reader :tagable_id, :tag
  
  belongs_to :tagable, polymorphic: true

end
