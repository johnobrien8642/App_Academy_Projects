class SessionsController < ApplicationController

    def new
        render :new
    end

    def create 
        user = User.find_by_credentials(
            params[:user][:email], 
            params[:user][:password]
        )

        if !user.nil?
            login_user!(user)
            flash[:notices] = ["User logged in"]
            redirect_to subs_url 
        else
            flash[:errors] = ["No account found, sign up for one here"]
            redirect_to new_user_url
        end
    end

    def destroy
        logout_user!
        flash.now[:notices] = ["Goodbye!"]
        render :new
    end
end
