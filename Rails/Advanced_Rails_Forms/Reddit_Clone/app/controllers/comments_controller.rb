class CommentsController < ApplicationController
    before_action :logged_in?, only: [ :new, :create, :destroy, :upvote, :downvote ]

    def new
        @comment = Comment.new
        render :new
    end

    def create
        @comment = Comment.new(comment_params)

        if @comment.save
            flash[:notices] = ["Comment posted"]
            redirect_to post_url(@comment.post)
        else
            flash[:errors] = @comment.errors.full_messages
            redirect_back(fallback_location: root_path)
        end
    end

    def show
        @comment = Comment.includes(:votes).find(params[:id])
        @child_comment = Comment.new
        render :show
    end

    def destroy
        comment = Comment.find(params[:id])
        comment.destroy
        redirect_back(fallback_location: root_path)
    end

    def upvote
        vote = Vote.new(user_id: current_user.id, value: 1, 
            votable_type: "Comment", votable_id: params[:id])
        if vote.save
            comment = Comment.find(params[:id])
            comment.vote_score += vote.value
            comment.save
            flash[:notices] = ["Upvoted!"]
            redirect_back(fallback_location: root_path)
        end
    end
    
    def downvote
        vote = Vote.new(user_id: current_user.id, value: -1, 
            votable_type: "Comment", votable_id: params[:id])
        if vote.save
            comment = Comment.find(params[:id])
            comment.vote_score += vote.value
            comment.save
            flash[:notices] = ["Downvoted!"]
            redirect_back(fallback_location: root_path)
        end
    end


    private

    def comment_params
        params.require(:comment).permit(:content, :author_id, 
            :post_id, :parent_comment_id)
    end
end
