class User < ApplicationRecord
    validates :username, presence: true, uniqueness: true
    validates :session_token, presence: true, uniqueness: true
    validates :password, length: { minimum: 6, allow_nil: true }
    validates :password_digest, presence: { message: "Password can't be blank"}

    attr_reader :password

    after_initialize :ensure_session_token

    def self.generate_session_token
      SecureRandom::urlsafe_base64(16)
    end

    def password=(password)
      @password = password
      self.password_digest = BCrypt::Password.create(password)
    end

    def is_password?(password)
      BCrypt::Password.new(self.password_digest).is_password?(password)
    end

    def self.find_by_credentials(username, password)
      user = User.find_by(username: username)
      return user if user && BCrypt::Password.new(user.password_digest).is_password?(password)
      nil
    end

    def reset_session_token!
      self.session_token = self.generate_session_token
      self.save!
      self.session_token
    end

    private

    def ensure_session_token
      self.session_token ||= self.class.generate_session_token
    end
end
