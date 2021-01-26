const APIUtil = require('./api_util.js')

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