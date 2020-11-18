class SearchesController < ApplicationController
    
    def index
      case
      when params[:model] == "site"
        @bands = Band.search(params[:search]) 
        @tracks = Track.search(params[:search])
        @albums = Album.search(params[:search])
      when params[:model] == "bands"
        @bands = Band.search(params[:search]) 
      when params[:model] == "albums"
        @albums = Album.search(params[:search])
      when params[:model] == "tracks"
        @tracks = Track.search(params[:search])
      end
      
      render :index
    end
end