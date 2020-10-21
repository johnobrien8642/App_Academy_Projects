require 'byebug'
class Comment < ApplicationRecord 
    validates :body, presence: true
    validate :no_duplicate_comments

    belongs_to :author, class_name: :User, foreign_key: :user_id
    belongs_to :artwork
    has_many :likes, as: :likeable
    

    private

    def no_duplicate_comments
    # this is just to practice custom validations, 'in the wild'
    # I would probably figure out a way to allow users to spam a comment 
    # a certain number of times before I deemed it invalid...
      past_comment = Comment
          .where('comments.body = ? AND 
                  comments.user_id = ?', 
                  self.body, self.user_id)
      unless past_comment.empty?
          errors[:comment] << 'cannot be a duplicate'
      end
    end
end