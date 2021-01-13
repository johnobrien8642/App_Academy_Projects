class User < ApplicationRecord
    extend FriendlyId
    friendly_id :email, use: :slugged

    validates :email, presence: true, uniqueness: true
    validates :password, length: { minimum: 6, allow_nil: true }
    validates :password_digest, presence: true

    after_initialize :ensure_session_token

    has_many :subs, 
        foreign_key: :creator_id,
        dependent: :destroy
    
    has_many :subscriptions, dependent: :destroy, inverse_of: :user
    has_many :subscribed_to_subs, through: :subscriptions, source: :sub
    
    has_many :posts,
        foreign_key: :author_id,
        dependent: :destroy

    has_many :comments,
        foreign_key: :author_id,
        dependent: :destroy

    attr_reader :password

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

    def reset_session_token!
        old_token = self.session_token

        until old_token != self.session_token
            self.session_token = User.generate_session_token
        end
        
        self.save!
        self.session_token
    end
    
    def self.generate_session_token
        SecureRandom::urlsafe_base64(16)    
    end

    def karma
        karma = 0
        self.comments.each do |c|
            c.votes.each do |v|
                karma += v.value
            end
        end 

        self.posts.each do |p|
            p.votes.each do |v|
                karma += v.value
            end
        end 
        karma
    end

    def total_votes_on_user_comments
        total_vote_count = 0
        self.comments.each { |c| total_vote_count += c.votes.count }
        total_vote_count
    end

     def total_votes_on_user_posts
        total_vote_count = 0
        self.posts.each { |p| total_vote_count += p.votes.count }
        total_vote_count
    end

    private

    def ensure_session_token
        self.session_token = User.generate_session_token
    end
end