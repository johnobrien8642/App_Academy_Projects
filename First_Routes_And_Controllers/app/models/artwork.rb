class Artwork < ApplicationRecord
    validates :title, :image_url, presence: true
    validates :image_url, uniqueness: true
    validates :title, uniqueness: { scope: :artist_id, 
        message: 'artist can only use title once' }
    

    belongs_to :artist,
      class_name: :User,
      foreign_key: :artist_id,
      primary_key: :id
    has_many :artwork_shares, dependent: :destroy
    has_many :shared_viewers, through: :artwork_shares, source: :viewer
    has_many :comments, 
      class_name: :Comment, 
      foreign_key: :artwork_id,
      dependent: :destroy
    has_many :likes, as: :likeable

    def self.artworks_for_user_id(user_id)
      user_artwork = Artwork
        .where('(artworks.artist_id = :user_id)', user_id: user_id)
        .distinct

      artwork_shared_with_user = Artwork
        .left_outer_joins(:artwork_shares)
        .where('(artwork_shares.viewer_id = :user_id)', user_id: user_id)
        .distinct

      user_artwork + artwork_shared_with_user
    end

    # def self.artworks_for_collection_id(collection_id)
    #   Artwork.joins(:artwork_collections).where(artwork_collections: { collection_id: collection_id })
    # end
end