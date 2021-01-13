class UserMailer < ApplicationMailer
    default from: 'john@99cats.com'

    def welcome_email(user)
        @user = user
        @url = 'http://localhost:3000/cats'
        mail(to: user.username, subjec: 'Meow! Welcome to 99 Cats!' )
    end
end
