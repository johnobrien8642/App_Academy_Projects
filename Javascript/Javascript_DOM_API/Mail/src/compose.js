const MessageStore = require('./message_store.js') 

module.exports = {
  renderForm () {
    const draft = MessageStore.getMessageDraft();
    const form = `
    <p class="new-message-header">New Message</p>
    <form class="compose-form">
      <input placeholder="Recipient" name="to" type="text" value="${draft.to}"></input>
      
      <input placeholder="Subject" name="subject" type="text" value="${draft.subject}"></input>
      
      <textarea name="body" rows="20">${draft.body}</textarea>
      
      <button type="submit" class="btn btn-primary submit-message">Send</button>
    </form>`

    return form
  },
  
  render () {
    const container = document.createElement('div');
    container.className = 'new-message';
    container.innerHTML = this.renderForm();
    container.addEventListener('change', function(e){
      let target = e.target;
      MessageStore.updateDraftField(target.name, target.value)
    })

    container.addEventListener('submit', function(e){
      e.preventDefault();
      MessageStore.sendDraft();
      location.hash = 'inbox';
    })
    
    return container;
  }
}