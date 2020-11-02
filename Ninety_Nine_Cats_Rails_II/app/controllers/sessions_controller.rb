class SessionsController < ApplicationController
  before_action :require_no_user!
  def new
    render :new
  end

  def create
    user = User.find_by_credentials(
        params[:user][:username],
        params[:user][:password]
      )
    
    if user.nil?
      flash.now[:error] = ["Incorrect username and/or password"]
      render :new
    else
      login_user!(user)
      redirect_to cats_url
    end
  end

  def destroy
    logout_user!
  end
end