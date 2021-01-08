class Post < ApplicationRecord
    validates :title, presence: true
    validates :title, uniqueness: { scope: :author_id }

    after_initialize :update_vote_score!

    belongs_to :author,
        foreign_key: :author_id,
        class_name: :User

    has_many :comments,
        foreign_key: :post_id,
        dependent: :destroy

    has_many :votes, as: :votable
    
    has_many :post_subs, dependent: :destroy, inverse_of: :post
    has_many :subs, through: :post_subs


    def comments_by_parent
        comment_hash = Hash.new { |h, k| h[k] = [] }

        self.comments.includes(:author).each do |c1|
            comment_hash[c1.parent_comment_id] << c1
        end

        comment_hash
    end

    def hotness
        hotness = 0
        votes_for_last_hour = self.votes.where('votes.created_at >= NOW() - 1 HOUR')
        hotness = votes_for_last_hour.count
        hotness * 100
    end

    private
    
    def update_vote_score!
        score = 0
        self.votes.each { |v| self.vote_score += v.value }
        self.vote_score
    end
end
