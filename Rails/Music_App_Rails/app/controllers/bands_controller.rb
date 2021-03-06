class BandsController < ApplicationController
  before_action :require_user!
  before_action :user_admin?, only: [:create, :update, :destroy]

  def index
    @bands = Band.includes(:tags).search(params[:search]) 
    render :index
  end

  def new
    render :new
  end

  def show
    @band = Band.find(params[:id])
    render :show
  end
  
  def create
    band = Band.new(band_params)

    if logged_in?
      band.save
      if !band.save
        flash.now[:errors] = band.errors.full_messages
        render :new
      else
        redirect_to bands_url
      end
    else
      flash.now[:errors] = ["User must be logged in to create a band"]
      render :new
    end
  end

  def edit
    @band = Band.find(params[:id])
    render :edit
  end

  def update
    band = Band.find(params[:id])

    if band.update_attributes(band_params)
      redirect_to bands_url
    else
      flash.now[:errors] = band.errors.full_messages
      render :edit
    end
  end

  def destroy 
    band = Band.find(params[:id])
    band.destroy
    redirect_to bands_url
  end

  private

  def band_params
    params.require(:band).permit(:name)  
  end
end
