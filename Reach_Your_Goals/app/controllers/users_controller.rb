class UsersController < ApplicationController
    before_action :require_user!, only: [:show, :destroy]

    def new
      @user = User.new
      render :new
    end

    def create
      @user = User.new(user_params)

      if @user.save
        login_user!(@user)
        redirect_to user_url(@user)
      else
        flash.now[:errors] = @user.errors.full_messages
        render :new
      end
    end

    def show
      @user = User.includes(:comments).find(params[:id])
      @complete_goals = User.find(params[:id]).goals.includes(:comments).where(completed: true)
      @incomplete_goals = User.find(params[:id]).goals.includes(:comments).where(completed: false)
      render :show
    end

    def destroy
      user = User.find(params[:id])
      user.destroy
    end

    private

    def user_params
      params.require(:user).permit(:username, :password)
    end
end
