const APIUtil = require("./api_util");
const FollowToggle = require("./follow_toggle");

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