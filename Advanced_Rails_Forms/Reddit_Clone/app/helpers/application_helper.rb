module ApplicationHelper

    def auth_token
        "<input type='hidden'
            name='authenticity_token'
            value='#{form_authenticity_token}'>".html_safe
    end

    def logout_button 
        "<form action='#{session_url}' method='POST'>
            #{auth_token} 

            <input type='hidden' name='_method' value='DELETE'>
            <input type='submit' value='Log out'>
        </form>".html_safe
    end

    def edit_button(item)
        author = item.is_a?(Sub) ? item.moderator : item.author
        action_url = item.is_a?(Sub) ? edit_sub_url(item) : edit_post_url(item)
        
        if item.persisted? && current_user_has_mod_permissions?(author)
            "<a href='#{action_url}'>Edit #{item.class.to_s}</a>".html_safe
        end 
    end

    def delete_button(item)
        author = item.is_a?(Sub) ? item.moderator : item.author
   
        case
        when item.is_a?(Sub)
            action_url = sub_url(item)
        when item.is_a?(Post)
            action_url = post_url(item)
        when item.is_a?(Comment)
            action_url = comment_url(item)
        end

        if current_user_has_mod_permissions?(author)
            "<form action='#{action_url}' method='POST'>
                #{auth_token} 

                <input type='hidden' name='_method' value='DELETE'>
                <input type='submit' value='delete'>
            </form>".html_safe
        end 
    end

    def must_be_logged_in_to_post
        #simply causes thrown error for before_action :logged_in? in ::SubsController
        "<form action='#{posts_url}' method='POST'> 
                #{auth_token} 

            <input type='hidden' name='post[title]' 
                id='post_title' value='blank'>

            <input type='hidden' name='post[url]'
                id='post_url' value='blank'>

            <input type='hidden' name='post[content]'
                id='post_content' value='blank'>

            <input type='hidden' name='post[author_id]' 
                id='post_author_id' value='blank'>

            <input type='hidden' name='post[sub_id]'
                id='post_sub_id' value='blank'>

            <input type='submit' value='Create New Sub'>
        </form>".html_safe
    end

    def upvote(item)
        action_url = item.is_a?(Post) ? 
                upvote_post_url(item) : 
                upvote_comment_url(item)   
        
        "<form action='#{action_url}' method='POST'>
            #{auth_token}

            <input type='submit' value='upvote'>
        </form>".html_safe
    end

    def downvote(item)
        action_url = item.is_a?(Post) ? 
                downvote_post_url(item) : 
                downvote_comment_url(item)   
        
        "<form action='#{action_url}' method='POST'>
            #{auth_token}

            <input type='submit' value='downvote'>
        </form>".html_safe  
    end

    def subscribe(sub)
        "<form action='#{subscribe_sub_url(sub)}' method='POST'>
            #{auth_token}
            
            <input type='hidden' name='sub_id' value='#{sub.id}'>
            <input type='submit' value='subscribe'>
        </form>".html_safe
    end

    def unsubscribe(sub)
    "<form action='#{unsubscribe_sub_url(sub)}' method='POST'>
            #{auth_token}
            
            <input type='hidden' name='sub_id' value='#{sub.id}'>
            <input type='submit' value='unsubscribe'>
    </form>".html_safe
    end
end

