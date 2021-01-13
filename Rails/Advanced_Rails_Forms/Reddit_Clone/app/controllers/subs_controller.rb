class SubsController < ApplicationController
    before_action :logged_in?, only: [ :new, :create, :subscribe, :unsubscribe ]
    before_action :require_current_user_owns_subs, only: [ :edit, :update ]

    def index
        @subs = Sub
            .includes( { moderator: [ { posts: :author }, :subscribed_to_subs ]}, :subscribers)
            .all
            .order('subs.created_at DESC')
            .page(params[:page]).per(10)
        @post = Post.new
        render :index
    end 

    def new
        @sub = Sub.new
        @creator = User.find(params[:user_id])
        render :new
    end

    def create
        @sub = Sub.new(sub_params)

        if @sub.save
            flash.now[:notices] = ["New sub created"]
            render :show
        else
            flash.now[:errors] = @sub.errors.full_messages
            render :new
        end
    end

    def show
        @sub = Sub.includes({ posts: [ :author, :votes ] }).find(params[:id])
        @post = Post.new
        render :show
    end

    def edit
        @sub = Sub.find(params[:id])
        render :edit
    end

    def update 
        @sub = Sub.find(params[:id])

        if @sub.update_attributes(sub_params)
            flash[:notices] = ["Sub successfully updated"]
            render :show
        else
            flash[:errors] = sub.errors.full_messages
            render :edit
        end
    end

    def destroy
        sub = Sub.find(params[:id])
        sub.destroy
        flash[:notices] = ["Sub deleted"]
        redirect_to user_url(sub.moderator)
    end

    def subscribe
        if logged_in?
            subscription = Subscription.new(user_id: current_user.id, 
                sub_id: params[:id])
            if subscription.save
                flash[:notices] = ["Subscribed!"]
                redirect_back(fallback_location: root_path)
            else
                flash[:errors] = subscription.errors.full_messages
                redirect_back(fallback_location: root_path)
            end
        else
            flash[:errors] = ["Create an account to subscribe"]
            redirect_back(fallback_location: root_path)
        end
    end

    def unsubscribe
        if logged_in?
            subscription = Subscription.find(params[:id])
            subscription.destroy
            flash[:notices] = ["Unsubscribed!"]
            redirect_back(fallback_location: root_path)
        else
            flash[:errors] = ["Create an account to subscribe"]
            redirect_back(fallback_location: root_path)
        end
    end

    private

    def sub_params
        params.require(:sub).permit(:title, :description, :creator_id, subscription_ids: [])
    end

    def require_current_user_owns_subs
        if logged_in?
            return if current_user.subs.find_by(id: params[:id])
            render json: "forbidden", status: :forbidden
        end
    end
end

