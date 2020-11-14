class Album < ApplicationRecord
    belongs_to :band
    has_many :tracks,
    dependent: :destroy

    validates :name, :year, presence: true
    validates :live, inclusion: { in: [true, false] }
    validates :band_id, uniqueness: { scope: :name }
    
    after_initialize :set_defaults

    private

    def set_defaults
      self.live ||= false
    end
end
