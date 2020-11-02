class User < ApplicationRecord
    validates :username, presence: true, uniqueness: true
    validates :password_digest, presence: { message: "Password can't be blank"}
    validates :session_token, presence: true, uniqueness: true

    def reset_session_token!
      self.session_token = self.class.generate_session_token
    end

    def self.generate_session_token
      SecureRandom::urlsafe_base64(16)
    end
end
