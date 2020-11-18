require 'byebug'
class Band < ApplicationRecord  
    validates :name, presence: true, uniqueness: true

    has_many :albums,
    dependent: :destroy
    has_many :tags, 
    as: :tagable,
    dependent: :destroy

    def self.search(search)
        if search
          Band.joins(:tags).where(['bands.name LIKE ? OR tags.name LIKE ?', 
            "%#{search}%", "%#{search}%"])
        else
          Band.all
        end
    end
end
