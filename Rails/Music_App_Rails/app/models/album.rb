class Album < ApplicationRecord
    belongs_to :band
    has_many :tracks,
    dependent: :destroy
    has_many :tags, 
    as: :tagable,
    dependent: :destroy

    validates :name, :year, presence: true
    validates :live, inclusion: { in: [true, false] }
    validates :band_id, uniqueness: { scope: :name }
    
    after_initialize :set_defaults

    def self.search(search)
        if search
          Album.joins(:tags).where(['albums.name LIKE ? OR tags.name LIKE ?', 
            "%#{search}%", "%#{search}%"])
        else
          Album.all
        end
    end

    private

    def set_defaults
      self.live ||= false
    end
end
