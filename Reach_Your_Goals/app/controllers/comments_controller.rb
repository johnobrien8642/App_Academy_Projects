class CommentsController < ApplicationController
    before_action :require_user!
    
    def new
      
    end

    def create
      case
      when params[:user_id]
        user_comment = UserComment.new(user_comment_params)
        if user_comment.save
          flash[:notices] = ["Comment posted"]
          redirect_to user_url(user_comment.user_id)
        else
          flash[:errors] = user_comment.errors.full_messages
          redirect_to user_url(user_comment.user_id)
        end
      when params[:goal_id]
        goal_comment = GoalComment.new(goal_comment_params)
        if goal_comment.save
          flash[:notices] = ["Comment posted"]
          redirect_to user_url(goal_comment.user_id)
        else
          flash[:errors] = goal_comment.errors.full_messages
          redirect_to user_url(goal_comment.user_id)
        end
      end
    end

    def edit

    end

    def update

    end

    def destroy

    end
    
    private

    def goal_comment_params
      params.require(:goal_comment).permit(:goal_id, :author_id, :content)
    end

    def user_comment_params
      params.require(:user_comment).permit(:user_id, :author_id, :content)
    end
end