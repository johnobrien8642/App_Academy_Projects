class Api::PokemonController < ApplicationController

  def show
    @poke = Pokemon.includes(:items, :moves).find(params[:id])
    
    render :show
  end

  def index
    @pokemon = Pokemon.all

    render :index
  end
    
  def create

  end

  private

  def pokemon_params 

  end

end
