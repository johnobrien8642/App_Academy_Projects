class GoalsController < ApplicationController
    before_action :require_user!
    
    def new
      @goal = Goal.new
      render :new
    end

    def create
      goal = Goal.new(goal_params)

      if goal.save 
        redirect_to user_url(goal.user_id)
      else
        flash.now[:errors] = goal.errors.full_messages
        render :new
      end 
    end

    def edit
      @goal = Goal.find(params[:id])
      render :edit
    end

    def update
      @goal = Goal.find(params[:id])

      if @goal.update_attributes(goal_params)
        redirect_to user_url(@goal.user_id)
      else
        flash.now[:errors] = @goal.errors.full_messages
        render :edit
      end
    end

    def destroy
      goal = Goal.find(params[:id])
      goal.destroy
    end

    private

    def goal_params
      params.require(:goal).permit(:user_id, :title, :description)
    end
end