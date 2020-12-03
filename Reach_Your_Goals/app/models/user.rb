class User < ApplicationRecord
    validates :session_token, presence: true, uniqueness: true
    validates :username, presence: true, uniqueness: true
    validates :password_digest, presence: true
    validates :password, length: { minimum: 6, allow_nil: true }

    attr_reader :password

    after_initialize :ensure_session_token

    has_many :goals
    has_many :comments_on_users,
      class_name: :UserComment,
      foreign_key: :author_id
    has_many :comments_on_self,
      class_name: :UserComment,
      foreign_key: :user_id
    has_many :goal_comments,
      class_name: :GoalComment,
      foreign_key: :goal_id


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
