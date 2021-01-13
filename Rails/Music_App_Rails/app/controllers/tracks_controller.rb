class TracksController < ApplicationController 
  before_action :require_user!
  before_action :user_admin?, only: [:create, :update, :destroy]

  
  def new
    band = Album.find(params[:album_id]).band
    @band_albums = band.albums
    @album = Album.find(params[:album_id])
    @new_track = Track.new
    render :new
  end

  def create
    track = Track.new(track_params)

    if track.save
      redirect_to album_url(track.album_id)
    else
      flash[:errors] = track.errors.full_messages
      redirect_to new_album_track_url(params[:tracks][:album_id])
    end
  end

  def show
    @track = Track.find(params[:id])
    @notes = @track.notes
    render :show
  end

  def edit
    @track = Track.find(params[:id])
    render :edit
  end
  
  def update
    track = Track.find(params[:id])

    if track.update_attributes(track_params)
      redirect_to album_url(track.album_id)
    else
      flash.now[:errors] = track.errors.full_messages
      render :edit
    end
  end

  def destroy
    track = Track.find(params[:id])
    track.destroy
    redirect_to album_url(track.album_id)
  end

  private

  def track_params
    params.require(:tracks).permit(:title, :ord, :album_id, :lyrics, :bonus)
  end

end
