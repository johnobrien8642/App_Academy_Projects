class UsersController < ApplicationController
    def new
      @user = User.new
      render :new
    end

    def create
      user = User.new(user_params)

      if user.save
        msg = UserMailer.welcome_email(user)
        msg.deliver_now
        flash[:alerts] = ["A link to activate your account has
        been sent to your email. Click the link in your email
        to finish logging in."]
        redirect_to new_session_url
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

    def activate
      user = User.find(params[:id])
      email_activation_token = params[:activation_token]
      if email_activation_token == user.activation_token
        user.toggle(:activated)
        login_user!(user)
        flash[:notices] = 
          ["You're account has been 
            activated, welcome to Music App!"]
        redirect_to bands_url
      else
        flash[:errors] = ["Activation token invalid"]
        redirect_to new_session_url
      end
    end

    private

    def user_params
      params.require(:users).permit(:email, :password)
    end
end