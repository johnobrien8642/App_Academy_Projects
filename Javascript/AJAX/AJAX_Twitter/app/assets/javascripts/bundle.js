/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./frontend/api_util.js":
/*!******************************!*\
  !*** ./frontend/api_util.js ***!
  \******************************/
/***/ ((module) => {

const APIUtil = {
  followUser: id => APIUtil.ChangeMyFollowStatus(id, "POST"),

  unfollowUser: id => APIUtil.ChangeMyFollowStatus(id, "DELETE"),

  ChangeMyFollowStatus: (id, method) => (
    $.ajax({
      url: `/users/${id}/follow`,
      dataType: "json",
      method
    })
  ),
  
  searchUsers: query => (
    $.ajax({
      url: `/users/search`,
      dataType: 'json',
      method: 'GET',
      data: { query }
    })
  ),

  createTweet: data => (
    $.ajax({
      url: `/tweets`,
      method: 'POST',
      dataType: 'json',
      data
    })
  ),

  fetchTweets: data => (
    $.ajax({
      url: '/feed',
      method: 'GET',
      dataType: 'json',
      data
    })
  )
}

module.exports = APIUtil;

/***/ }),

/***/ "./frontend/follow_toggle.js":
/*!***********************************!*\
  !*** ./frontend/follow_toggle.js ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const APIUtil = __webpack_require__(/*! ./api_util.js */ "./frontend/api_util.js")

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

/***/ }),

/***/ "./frontend/infinite_tweets.js":
/*!*************************************!*\
  !*** ./frontend/infinite_tweets.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const APIUtil = __webpack_require__(/*! ./api_util.js */ "./frontend/api_util.js") 

class InfiniteTweets {
  constructor (el) {
    this.$el = $(el);
    this.lastCreatedAt = null;

    $(document).ready(this.initializeTweets.bind(this));
    this.$el.on('click', '.fetch-more', this.fetchTweets.bind(this));
    this.$el.on('insert-tweet', this.insertTweet.bind(this));
  }

  initializeTweets () {
    const infiniteTweets = this;
    const data = {};
    
    APIUtil.fetchTweets(data).then((data) => {
      if (data.length > 0) {
        infiniteTweets.insertTweets(data);
        infiniteTweets.lastCreatedAt = data[data.length - 1].created_at;
      } else {
        const $msg = $('<div>').text('No tweets yet, follow someone!')
        this.$el.find('ul.tweets').append($msg)
      }
    })
  }

  fetchTweets (event) {
    event.preventDefault();

    const infiniteTweets = this;
    const data = {};

    if (this.lastCreatedAt) data.max_created_at = this.lastCreatedAt;
 
    APIUtil.fetchTweets(data).then((data) =>{
      infiniteTweets.insertTweets(data);

      if (data.length < 20) {
        infiniteTweets.$el
          .find('.fetch-more')
          .replaceWith('<b>No more tweets!</b>');
      }

      if (data.length > 0) {
        infiniteTweets.lastCreatedAt = data[data.length - 1].created_at;
      }

      this.clearInput();
    })
  }

  clearInput() {
    this.$el.find('textarea').empty();
    this.$el.find(':input').prop('disabled', false)
  }

  insertTweets(data) {
    this.$el.find('ul.tweets').append(data.map(this.tweetElement));
  }

  insertTweet(event, data) {
    this.$el.find('ul.tweets').prepend(this.tweetElement(data))
    
    if(!this.lastCreatedAt) {
      this.lastCreatedAt = data.created_at
    }
  }

  tweetElement(tweet) {
    const mentions = tweet.mentions.map(mention =>
      `<li>
        <a href='/users/${tweet.user.id}'>@${mention.user.username}</a>
      </li>`)
      .join('');

    const elementString = `
    <li>
      <h3>
        <a href='/users/${tweet.user.id}'>
          @${tweet.user.username}
        </a>
      </h3>
      
      <p>${tweet.content}</p>
      
      <ul>Mentions
        ${mentions}
      </ul>
    </li>
    `
    return $(elementString);
  }

}

module.exports = InfiniteTweets;

/***/ }),

/***/ "./frontend/tweet_compose.js":
/*!***********************************!*\
  !*** ./frontend/tweet_compose.js ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const APIUtil = __webpack_require__(/*! ./api_util.js */ "./frontend/api_util.js")

class TweetCompose {
  constructor (el) {
    this.$el = $(el);
    this.$mentionedUsersUl = this.$el.find('.mentioned-users');
    this.$el.on('submit', this.submit.bind(this))
    this.$el.on('input', this.charCount.bind(this))
    this.$el.find('.add-mentioned-user').on(
      'click', this.addMentionedUser.bind(this));
    this.$mentionedUsersUl.on(
      'click', '.remove-mentioned-user', this.removeMentionedUser.bind(this));
  }

  submit (event) {
    event.preventDefault();
    
    const data = this.$el.serializeJSON();

    this.$el.find(':input').prop('disabled', true);

    APIUtil.createTweet(data).then(tweet => this.handleSuccess(tweet))
  }

  addMentionedUser (event) {
    event.preventDefault();

    this.$mentionedUsersUl.append(this.newUserSelect());
  }

  removeMentionedUser (event) {
    event.preventDefault();

    $(event.currentTarget).parent().remove();
  }
 
  handleSuccess (tweet) {
    const $tweetsUl = $(this.$el.data('tweets-ul'));
    $tweetsUl.trigger('insert-tweet', tweet);

    this.clearInput();
  }

  clearInput () {
    this.$el.find('textarea').empty();
    this.$el.find(':input').prop('disabled', false)
    this.$el.find('.mentioned-users').empty();
  }

  charCount () {
    const length = this.$el.find('textarea').val().replace(/ /g, '').length
    const charsLeft = 140 - length
    const strongTag = this.$el.find('.chars-left')
    strongTag.empty();
    strongTag.append('Characters left: ')
    strongTag.append(charsLeft)
  }

  newUserSelect () {
    const userOptions = window.users
      .map(user =>
          `<option value='${user.id}'>${user.username}</option>`)
      .join('')

    const html = `
      <div>
        <select name='tweet[mentioned_user_ids][]'>
          ${userOptions}
        </select>
        
        <button class='remove-mentioned-user'>Remove</button>
      </div>`

    return $(html);
  }
}

module.exports = TweetCompose;

/***/ }),

/***/ "./frontend/users_search.js":
/*!**********************************!*\
  !*** ./frontend/users_search.js ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const APIUtil = __webpack_require__(/*! ./api_util */ "./frontend/api_util.js");
const FollowToggle = __webpack_require__(/*! ./follow_toggle */ "./frontend/follow_toggle.js");

class UsersSearch {
  constructor (el) {
    this.$el = $(el);
    this.$input = this.$el.find('input[name=username]');
    this.$ul = this.$el.find('.users')

    this.$el.on('input', this.handleInput.bind(this));
  }

  handleInput () {
    if (this.$input.val() === '') {
      this.renderResults([]);
      return;
    }

    APIUtil.searchUsers(this.$input.val())
      .then(users => this.renderResults(users));
  }

  renderResults (users) {
    for (let i = 0; i < users.length; i++) {
      const user = users[i]
      
      this.$ul.empty();

      const $userLink = $('<a>');
      $userLink.text(`@${user.username}`);
      $userLink.attr('href', `/users/${user.id}`);

      const $followButton = $('<button></button>')
      new FollowToggle($followButton, {
        userId: user.id,
        followState: user.followed ? 'followed' : 'unfollowed'
      });

      $userLink.append($followButton)

      const $li = $('<li>');
      $li.append($userLink);
      $li.append($followButton)

      this.$ul.append($li);
    }
  }
}

module.exports = UsersSearch;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
(() => {
/*!*****************************!*\
  !*** ./frontend/twitter.js ***!
  \*****************************/
const FollowToggle = __webpack_require__(/*! ./follow_toggle.js */ "./frontend/follow_toggle.js");
const TweetCompose = __webpack_require__(/*! ./tweet_compose.js */ "./frontend/tweet_compose.js")
const InfiniteTweets = __webpack_require__(/*! ./infinite_tweets.js */ "./frontend/infinite_tweets.js")
const UsersSearch = __webpack_require__(/*! ./users_search.js */ "./frontend/users_search.js")

$(function () {
  $('div.infinite-tweets').each(function(i, fetch){ new InfiniteTweets(fetch) })
  $('form.tweet-compose').each(function(i, form) { new TweetCompose(form) })
  $('nav.users-search').each(function (i, search) { new UsersSearch(search) })
  $('button.follow-toggle').each(function(i, btn) { new FollowToggle(btn) })
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map