class ApplicationController < ActionController::Base
    protect_from_forgery with: :exception

    # def login_user!(user)
    #   session_token[:session_token] = user.session_token
    # end
end
