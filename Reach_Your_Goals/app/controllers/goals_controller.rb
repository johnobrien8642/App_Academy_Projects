class GoalsController < ApplicationController
    before_action :require_user!, only: [:new, :edit, :destroy, :toggle_completed]
    
    def toggle_completed
      goal = Goal.find(params[:id])
      goal.toggle_completed!
      if goal.completed
        flash[:notices] = [goal.title + " marked completed!"]
        redirect_to user_url(goal.user_id)
      else
        flash[:notices] = [goal.title + " marked incomplete"]
        redirect_to user_url(goal.user_id)
      end
    end
    
    def index 
      @goals = Goal.all
      render :index
    end
    
    def new
      @user = User.find(params[:user_id])
      @goal = Goal.new
      render :new
    end

    def create
      goal = Goal.new(goal_params)

      if goal.save 
        redirect_to goals_url
      else
        flash.now[:errors] = goal.errors.full_messages
        render :new
      end 
    end

    def show
     @goal = Goal.find(params[:id])
     render :show
    end

    def edit
      @goal = Goal.find(params[:id])
      render :edit
    end

    def update
      @goal = Goal.find(params[:id])

      if @goal.update_attributes(goal_params)
        redirect_to goal_url(@goal)
      else
        flash.now[:errors] = @goal.errors.full_messages
        render :edit
      end
    end

    def destroy
      goal = Goal.find(params[:id])
      goal.destroy
      flash[:notices] = [goal.title + " deleted"]
      redirect_to user_url(goal.user_id)
    end

    def cheer

    end

    private

    def goal_params
      params.require(:goal).permit(:user_id, :title, :description, :private)
    end
end