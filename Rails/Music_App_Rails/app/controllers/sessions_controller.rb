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
      elsif user.activated?
        login_user!(user)
        redirect_to bands_url
      else
        flash[:alerts] = ["You must activate your account. Go to your
        email and click the activation link, then try logging in again."]
        redirect_to new_session_url
      end
    end

    def destroy
      logout_user!
      redirect_to new_session_url
    end
end
