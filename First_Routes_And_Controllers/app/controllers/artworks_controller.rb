class ArtworksController < ApplicationController
  def index
    if params[:user_id]
      render json: Artwork.artworks_for_user_id(params[:user_id])
    end
    # artwork_for_user = User.find(params[:artist_id])
    # render artwork_for_user.artworks, artwork_for_user.artwork_shares
  end

  def create
    artwork = Artwork.new(artwork_params)

    if artwork.save!
        render json: artwork
    else
        render artwork.errors.full_messages, status: :unprocessable_entity
    end
  end

  def show
    render json: Artwork.find(params[:id])
  end

  def update 
    artwork = Artwork.find(params[:id])

    if artwork.update_attributes(artwork_params)
        render json: artwork
    else
        render artwork.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    artwork = Artwork.find(params[:id])
    artwork.destroy
    render json: artwork
  end

  def like
    like = Like.new(user_id: params[:user_id], likeable_id: params[:id], likeable_type: 'Artwork')
    if like.save!
      render json: like
    else
      render like.errors.full_messages, status: :unprocessable_entity
    end
  end

  def unlike
    like = Like.find_by(user_id: params[:user_id], likeable_id: params[:id], likeable_type: 'Artwork')
    if like.destroy
      render json: like
    else
      render json: like.errors.full_messages, status: :unprocessable_entity
    end
  end

  def favorite 
    artwork = Artwork.find_by(id: params[:id], artist_id: params[:user_id])
    artwork.favorite = true
    artwork.save
    render json: artwork
  end

  def unfavorite
    artwork = Artwork.find_by(id: params[:id], artist_id: params[:user_id])
    artwork.favorite = false
    artwork.save
    render json: artwork
  end
  
  private

  def artwork_params
    params.require(:artwork).permit(:artist_id, :title, :image_url)
  end
end