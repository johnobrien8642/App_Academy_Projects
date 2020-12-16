class User < ApplicationRecord
    include Commentable
    include Cheerable
    
    validates :session_token, presence: true, uniqueness: true
    validates :username, presence: true, uniqueness: true
    validates :password_digest, presence: true
    validates :password, length: { minimum: 6, allow_nil: true }
    validates_numericality_of :user_cheers, less_than_or_equal_to: 5 

    attr_reader :password
    
    after_initialize :ensure_session_token

    has_many :goals
    has_many :comments_on_users,
      class_name: :Comment,
      foreign_key: :author_id,
      dependent: :destroy

    def self.find_by_credentials(username, password)
      user = User.find_by(username: username)
      return user if user && user.is_password?(password)
    end

    def is_password?(password)
      BCrypt::Password.new(self.password_digest).is_password?(password)
    end

    def password=(password)
      @password = password
      self.password_digest = BCrypt::Password.create(password)
    end

    def self.generate_session_token
      SecureRandom::urlsafe_base64(16)
    end

    def reset_session_token!
      self.session_token = User.generate_session_token
      self.save!

      self.session_token
    end

    private 

    def ensure_session_token
      self.session_token ||= User.generate_session_token
    end
end
