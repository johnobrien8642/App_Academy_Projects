class ApplicationController < ActionController::Base

    def login_user!(user)
      session.session_token = user.reset_session_token!
    end

end
