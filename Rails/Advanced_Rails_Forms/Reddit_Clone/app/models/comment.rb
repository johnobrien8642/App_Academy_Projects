class Comment < ApplicationRecord
    validates :content, presence: true

    after_initialize :update_vote_score!

    belongs_to :author,
        foreign_key: :author_id,
        class_name: :User
    
    belongs_to :post

    has_many :child_comments,
        foreign_key: :parent_comment_id,
        class_name: :Comment

    has_many :votes, as: :votable

    def hotness
        hotness = 0
        votes_for_last_hour = self.votes
            .where("votes.created_at >= (NOW() - INTERVAL '1 HOUR')")
        hotness = votes_for_last_hour.count
        hotness * 10
    end

    private

    def update_vote_score!
        score = 0
        self.votes.each { |v| self.vote_score += v.value }
        self.vote_score
    end
end
