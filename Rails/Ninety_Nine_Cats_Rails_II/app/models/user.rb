class User < ApplicationRecord
    validates :username, presence: true, uniqueness: true
    validates :password, length: { minimum: 6, allow_nil: true }
    validates :password_digest, presence: { message: "Password can't be blank"}
    validates :session_token, presence: true, uniqueness: true

    attr_reader :password

    after_initialize :ensure_session_token

    has_many :cats
    has_many :rental_requests,
      class_name: :CatRentalRequest,
      foreign_key: :user_id

    def self.find_by_credentials(username, password)
      user = User.find_by(username: username)
      return user if user && user.is_password?(password)
      nil
    end

    def is_password?(password)
      BCrypt::Password.new(self.password_digest).is_password?(password)
    end

    def password=(password)
      @password = password
      self.password_digest = BCrypt::Password.create(password)
    end
    
    def reset_session_token!
       self.session_token = SecureRandom.urlsafe_base64(16)
       self.save!
       self.session_token
    end

    def owns_cat?(cat)
      cat.user_id == self.id
    end

    private
    
    def ensure_session_token
      self.session_token ||= SecureRandom.urlsafe_base64(16)
    end
end
