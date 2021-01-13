class User < ApplicationRecord
    has_many :notes,
    dependent: :destroy

    validates :email, presence: true, uniqueness: true
    validates :password, length: { minimum: 6, allow_nil: true}
    validates :password_digest, presence: { message: "Password can't be blank"}
    validates :session_token, presence: true, uniqueness: true
    validates :activation_token, presence: true
    
    attr_reader :password

    after_initialize :ensure_session_token, :ensure_activation_token

    
    def self.find_by_credentials(email, password)
      user = User.find_by(email: email)
      return user if user && user.is_password?(password)
      nil
    end

    def password=(password)
      @password = password
      self.password_digest = BCrypt::Password.create(password)
    end

    def is_password?(password)
      BCrypt::Password.new(self.password_digest).is_password?(password)
    end

    def self.generate_token
      SecureRandom::urlsafe_base64(16)
    end

    def reset_session_token!
      self.session_token = User.generate_token
      self.save!
      self.session_token
    end
    
    def activate!
      self.update_attribute(:activated, true)
    end

    private
    
    def ensure_session_token
      self.session_token ||= User.generate_token
    end

    def ensure_activation_token
      self.activation_token ||= User.generate_token
    end
end