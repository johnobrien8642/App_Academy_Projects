class SessionsController < ApplicationController 
    def new
      render :new
    end

    def create
      user = User.find_by_credentials(
          params[:users][:email],
          params[:users][:password]
      )

      if user.nil?
        flash.now[:errors] = ["Email and/or password incorrect"]
        render :new
      else
        login_user!(user)
        redirect_to bands_url
      end
    end

    def destroy
      logout_user!
      redirect_to new_session_url
    end
end
