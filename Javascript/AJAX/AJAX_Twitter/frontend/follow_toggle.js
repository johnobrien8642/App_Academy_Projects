const APIUtil = require('./api_util.js')

class FollowToggle {
  constructor (el, options) {
    this.$el = $(el);
    this.userId = (this.$el.data('user-id') || options.userId);
    this.followState = (this.$el.data('initial-follow-state') ||
                          options.followState);
                          
    this.render();
    this.$el.on('click', this.handleClick.bind(this));
  }

  render() {
    if (this.followState === 'followed') {
      this.$el.prop('disabled', false)
      this.$el.text('Unfollow')
    } else if (this.followState === 'unfollowed') {
      this.$el.prop('disabled', false)
      this.$el.text('Follow')
    } else if (this.followState === 'following') {
      this.$el.prop('disabled', true)
      this.$el.text('Following...')
    } else if (this.followState === 'unfollowing') {
      this.$el.prop('disabled', true)
      this.$el.text('Unfollowing...')
    }
  }

  handleClick (event) {
    const followButton = this
    
    event.preventDefault;
      
    if (this.followState === 'followed') {
      followButton.followState = 'unfollowing'
      followButton.render();
      APIUtil.unfollowUser(this.userId).then(function () {
        followButton.followState = 'unfollowed';
        followButton.render();
      })
      // $.ajax({
      //   url: '/users/' + this.userId + '/follow',
      //   method: 'DELETE',
      //   dataType: "json",
      //   success: function () {
      //     followButton.followState = 'unfollowed'
      //     followButton.render();
      //   }
      // })
    } else if (this.followState === 'unfollowed') {
      followButton.followState = 'following'
      followButton.render();
      APIUtil.followUser(this.userId).then(function () {
        followButton.followState = 'followed';
        followButton.render();
      })
      // $.ajax({
      //   url: '/users/' + this.userId + '/follow',
      //   method: 'POST',
      //   dataType: "json",
      //   success: function() {
      //     followButton.followState = 'followed'
      //     followButton.render();
      //   }
      // })
    } 
  }

  
}

module.exports = FollowToggle;