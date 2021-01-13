require 'byebug'
class Track < ApplicationRecord
    belongs_to :album
    has_many :notes,
    class_name: :Note,
    dependent: :destroy
    has_many :tags,
    as: :tagable,
    dependent: :destroy

    validates :title, :ord, :album_id, presence: true
    validates :bonus, inclusion: { in: [true, false] }
    validates :album_id, uniqueness: { scope: :ord }

    after_initialize :set_defaults

    def self.search(search)
        if search
          Track.joins(:tags).where(['tracks.title LIKE ? OR tags.name LIKE ?', 
            "%#{search}%", "%#{search}%"])
        else
          Track.all
        end
    end

    private

    def set_defaults
      self.bonus ||= false
    end
end
