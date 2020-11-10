class Album < ApplicationRecord
    belongs_to :band

    validates :name, :year, presence: true
    validates :live, inclusion: { in: [true, false] }
    validates :band_id, uniqueness: { scope: :name }
    
    after_initialize :set_defaults

    private

    def set_defaults
      self.live ||= false
    end
end
