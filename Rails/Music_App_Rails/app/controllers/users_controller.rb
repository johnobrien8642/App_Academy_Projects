class UsersController < ApplicationController
    before_action :user_admin?, only: [:index, :make_admin]

    def index
      @users = User.all
      render :index
    end
  
    def new
      @user = User.new
      render :new
    end

    def create
      user = User.new(user_params)

      if user.save
        # Activation email flow
        #----------------------------------------------------------------------
        # msg = UserMailer.welcome_email(user)
        # msg.deliver_now
        # flash[:alerts] = ["A link to activate your account has
        #   been sent to your email. Click the link in your email
        #   to finish logging in."]
        # redirect_to new_session_url
        #----------------------------------------------------------------------
        # Without activation email flow, passes current tests
        user.activate!
        login_user!(user)
        redirect_to bands_url
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
      #linked to in activation email
      #----------------------------------------------------------------------
      user = User.find(params[activation_token: params[:activation_token]])
      user.activate!
      login_user!(user)
      flash[:notices] = 
      ["You're account has been activated, welcome to Music App!"]
      redirect_to bands_url
      #----------------------------------------------------------------------
    end

    def make_admin
      user = User.find(params[:id])
      user.toggle(:admin).save
      redirect_to users_url
    end

    private

    def user_params
      params.require(:users).permit(:email, :password)
    end
end