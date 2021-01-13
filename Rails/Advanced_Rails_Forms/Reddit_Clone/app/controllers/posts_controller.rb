    class PostsController < ApplicationController
    before_action :logged_in?, only: [ :new, :create, :upvote, :downvote ]
    before_action :require_current_user_owns_posts, only: [ :edit, :update ]
    
    def new
        @post = Post.new
        render :new
    end

    def create
        @post = Post.new(post_params)

        if @post.save
            flash[:notices] = ["Post created"]
            redirect_to user_url(@post.author) 
        else
            if !logged_in?
                flash[:errors] = ["Must be logged in to post"]
                redirect_to subs_url
            else
                flash[:errors] = @post.errors.full_messages
                redirect_back(fallback_location: root_path)
            end
        end
    end

    def show
        @post = Post.find(params[:id])
        @all_comments = @post.comments.includes(:author)
        @comment = Comment.new
        render :show
    end

    def edit
        @post = Post.find(params[:id])
        render :edit
    end

    def update
        @post = Post.find(params[:id])

        if @post.update_attributes(post_params)
            flash[:notices] = ["Post updated"]
            render :show
        else
            flash[:errors] = @post.errors.full_messages 
            render :edit 
        end
    end

    def destroy
        post = Post.find(params[:id])
        post.destroy
        flash[:notices] = ["Post deleted"]
        redirect_to user_url(post.author) 
    end

    def upvote
        if logged_in?
            vote = Vote.new(user_id: current_user.id, value: 1, 
                votable_type: "Post", votable_id: params[:id])
            if vote.save
                post = Post.find(params[:id])
                post.vote_score += vote.value
                post.save
                flash[:notices] = ["Upvoted!"]
                redirect_back(fallback_location: root_path)
            end
        else
            flash[:errors] = ["Must have an account to upvote"]
            redirect_back(fallback_location: root_path)
        end
    end
    
    def downvote
        if logged_in?
          vote = Vote.new(user_id: current_user.id, value: -1, 
              votable_type: "Post", votable_id: params[:id])
          if vote.save
              post = Post.find(params[:id])
              post.vote_score += vote.value
              post.save
              flash[:notices] = ["Upvoted!"]
              redirect_back(fallback_location: root_path)
          end
        else
        	flash[:errors] = ["Must have an account to upvote"]
        	redirect_back(fallback_location: root_path)
        end
    end


    private

    def post_params
        params.require(:post).permit(:title, :url, 
        :content,  :author_id, sub_ids: [])
    end

    def require_current_user_owns_posts
        if logged_in?
            return if current_user.posts.find_by(id: params[:id])
            render json: "forbidden", status: :forbidden
        end
    end
end
