class UsersController < ApplicationController

    def new
        @user = User.new
        render :new
    end

    def create 
        @user = User.new(user_params)

        if @user.save
            login_user!(@user)
            flash[:notices] = ["Welcome to Reddit Clone!"]
            redirect_to subs_url
        else
            flash.now[:errors] = @user.errors.full_messages
            render :new
        end
    end

    def show
        @user = User
            .includes(subs: :posts)
            .friendly
            .find(params[:id])
        @post = Post.new
        @total_votes_on_user_posts = 
        @total_votes_on_user_comments = 
        render :show
    end

    def update
        render json: ["User updated"]
    end

    def destroy
        render json: ["User deleted"]
    end

    private

    def user_params
        params.require(:user).permit(:email, :password)
    end
end
