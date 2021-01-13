class CommentsController < ApplicationController
    before_action :require_user!
    
    def create
      user_id = params[:user_id]
      comment = Comment.new(comment_params)
      if comment.save
        flash[:notices] = ["Comment posted"]
        redirect_to user_url(user_id)
      else
        flash[:errors] = comment.errors.full_messages
        redirect_to user_url(user_id)
      end
    end

    def destroy
      user_id = params[:user_id]
      comment = Comment.find(params[:id])
      comment.destroy
      redirect_to user_url(user_id)
    end
    
    private

    def comment_params
      params.require(:comment).permit(:commentable_type, :commentable_id, :author_id, :content)
    end
end