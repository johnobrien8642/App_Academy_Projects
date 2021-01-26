const FollowToggle = require('./follow_toggle.js');
const TweetCompose = require('./tweet_compose.js')
const InfiniteTweets = require('./infinite_tweets.js')
const UsersSearch = require('./users_search.js')

$(function () {
  $('div.infinite-tweets').each(function(i, fetch){ new InfiniteTweets(fetch) })
  $('form.tweet-compose').each(function(i, form) { new TweetCompose(form) })
  $('nav.users-search').each(function (i, search) { new UsersSearch(search) })
  $('button.follow-toggle').each(function(i, btn) { new FollowToggle(btn) })
});