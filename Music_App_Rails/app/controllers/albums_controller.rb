class AlbumsController < ApplicationController
  before_action :require_user!

  def new
    @band = Band.find(params[:band_id])
    @album = Album.new(band_id: params[:band_id])
    render :new
  end

  def create
    album = Album.new(album_params)

    if album.save
      redirect_to band_url(album.band_id)
    else
      flash[:errors] = album.errors.full_messages
      redirect_to new_band_album_url(params[:album][:band_id])
    end
  end

  def show
    @tracks = Track.where(album_id: params[:id])
    @album = Album.find(params[:id])
    render :show
  end

  def edit
    @album = Album.find(params[:id])
    render :edit
  end

  def update
    album = Album.find(params[:id])

    if album.update_attributes(album_params)
      redirect_to album_url(album)
    else
      flash.now[:errors] = album.errors.full_messages
      render :edit
    end
  end

  def destroy
    album = Album.find(params[:id])
    album.destroy
    redirect_to band_url(album.band_id)
  end

  private

  def album_params
    params.require(:albums).permit(:name, :year, :band_id, :live)
  end
end
