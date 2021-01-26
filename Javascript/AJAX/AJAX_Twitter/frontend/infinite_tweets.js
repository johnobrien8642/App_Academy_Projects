const APIUtil = require('./api_util.js') 

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