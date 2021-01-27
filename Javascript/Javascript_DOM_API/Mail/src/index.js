const Router = require('./router.js')
let Inbox = require('./inbox.js')
let Sent = require('./sent.js')
let Compose = require('./compose.js')

let routes = {
  inbox: Inbox,
  sent: Sent,
  compose: Compose
}

document.addEventListener('DOMContentLoaded', function(){
  const content = document.querySelector('.content');
  const router = new Router(content, routes);
  router.start();

  window.location.hash = "#inbox";
  const sidebarLis = Array.from(document.querySelectorAll('.sidebar-nav li'));
  sidebarLis.forEach(function(navLi){
    navLi.addEventListener('click', function(){
      let hashText = navLi.textContent.toLowerCase();
      location.hash = hashText;
    })
  })
})



