class Api::BenchesController < ApplicationController
  before_action :require_logged_in, only: [ :create ]


  def index
    benches = bounds ? Bench.in_bounds(bounds) : Bench.all

    if params[:minSeating] && params[:maxSeating]
      @benches = benches.where(seating: seating_range)
    end

    @benches
    render :index
  end

  def show
    @bench = Bench.find(params[:id])

    render :show
  end

  def create
    @bench = Bench.new(bench_params)

    if @bench.save
      render :show
    else
      render json: @bench.errors.full_messages, status: 500
    end
  end

  def bounds
    params[:bounds]
  end

  def seating_range
    (params[:minSeating]..params[:maxSeating])
  end

  def bench_params
    params.require(:bench).permit(
      :description, :lat, :lng, 
      :seating, :maxSeating, :minSeating,
      :photo
      )
  end
end