const MessageStore = require('./message_store.js')

module.exports = {
  renderMessage(msg) {
    const li = document.createElement('li');
    li.className = 'message';
    li.innerHTML = `
    <span class="to">To: ${msg.to}</span>
    <span class="subject">${msg.subject}</span>
    <span class="body">${msg.body}</span>`;
    return li;
  },

  render() {
    const messages = MessageStore.getSentMessages();
    const ul = document.createElement('ul');
    ul.className = 'messages';
    let that = this
    messages.forEach(function (msg) {
      const rendered = that.renderMessage(msg);
      ul.appendChild(rendered)
    })
    return ul;
  }
};