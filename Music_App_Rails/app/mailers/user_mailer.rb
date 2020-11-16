class UserMailer < ApplicationMailer
    default from: "john@musicapp.com"

    def welcome_email(user)
      @user = user
      @url = activate_user_url(id: @user.id, activation_token: @user.activation_token)
      mail(to: user.email, subject: 'Welcome to Music App!') 
    end

end
