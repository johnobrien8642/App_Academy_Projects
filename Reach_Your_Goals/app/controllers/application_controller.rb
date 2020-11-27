class ApplicationController < ActionController::Base
    protect_from_forgery with: :exception

    helper_method :current_user, :login_user!, :logout_user!, :require_user!

    def current_user
      return nil unless session[:session_token]
      @current_user ||= User.find_by(session_token: session[:session_token])
    end

    def login_user!(user)
      session[:session_token] = user.reset_session_token!
    end

    def logout_user!
      current_user.reset_session_token!
      session[:session_token] = nil
    end

    def require_user!
      unless current_user
        flash[:errors] = ["User must be logged in"]
        redirect_to new_session_url
      end
    end
end
