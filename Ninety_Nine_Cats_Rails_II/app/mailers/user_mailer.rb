class UserMailer < ApplicationMailer
    default from: "johnfromninetyninecats@example.com"

    def welcome_email(user)
      @user = user

      mail(to: @user.username, subject: "Welcome to 99 cats, hope you enjoy!")
    end

end
