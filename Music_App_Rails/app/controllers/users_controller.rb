class UsersController < ApplicationController

    def new
      @user = User.new
      render :new
    end

    def create
      user = User.new(user_params)

      if user.save
        login_user!(user)
        redirect_to user_url(user)
      else
        flash.now[:errors] = user.errors.full_messages
        render :new
      end
    end

    def show
      @user = User.find(params[:id])
      @notes = @user.notes
      render :show
    end

    private

    def user_params
      params.require(:users).permit(:email, :password)
    end
end