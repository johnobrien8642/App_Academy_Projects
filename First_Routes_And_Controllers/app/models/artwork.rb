class Artwork < ApplicationRecord
    validates :artist_id, :title, :image_url, presence: true
    validates :image_url, uniqueness: true
    validates :title, uniqueness: { scope: :artist_id, 
        message: 'artist can only use title once' }
    

    belongs_to :artist,
      class_name: :User,
      foreign_key: :artist_id,
      primary_key: :id
    has_many :artwork_shares
    has_many :shared_viewers, through: :artwork_shares, source: :viewer
end