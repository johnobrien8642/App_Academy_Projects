class DOMNodeCollection {
  constructor (nodes) {
    this.nodes = nodes
  }

  on(eventName, callback) {
    this.nodes.forEach(function(node) {
      node.addEventListener(eventName, callback);
      const eventKey = `jsqliteEvents-${eventName}`;
      if (typeof node[eventKey] === 'undefined') {
        node[eventKey] = [];
      }
      node[eventKey].push(callback);
    })
  }

  off(eventName){
    this.nodes.forEach(function(node){
      const eventKey = `jqliteEvents-${eventName}`;
      if (node[eventKey]) {
        node[eventKey].forEach(function(callback){
          node.removeEventListener(eventName, callback);
        })
      }
      node[eventKey] = [];
    })
  }
  
  html (arg) {
    if (typeof arg === 'string') {
      this.arr.forEach(function(node){
        node.innerHTML = arg
      })
    } else if (this.nodes.length > 0) {
      return this.arr[0].innerHTML
    }
  }

  empty () {
    this.html('')
  }

  append (children) {
    if (this.nodes.length === 0) return;

    if (typeof children === 'object' &&
        !(children instanceof DOMNodeCollection)) {
      
      children = $l(children);
    }

    if (typeof children === 'string') {
      this.nodes.forEach(function(node){
        node.innerHTML += children;
      })
    } else if (children instanceof DOMNodeCollection) {
      this.nodes.forEach(function(node){

        children.forEach(function(childNode){
          node.appendChild(childNode.cloneNode(true));
        }) 
      })
    }
  }

  attr (key, val) {
    if (typeof val === 'string') {
      this.forEach(function(node){
        node.setAttribute(key, val)
      })
    } else {
      return this.nodes[0].getAttribute(key);
    }
  }

  addClass (newClass) {
    this.nodes.forEach(function(node) { node.classList.add(newClass) })
  }

  removeClass(oldClass) {
    this.nodes.forEach(function (node) { node.classList.remove(removeClass) })
  }

  children () {
    const children = []
    this.nodes.forEach(function(node){
      const childNodes = node.children;
      children = childNodes.concat(Array.from(childNodes))
    })
    return new DOMNodeCollection(children)
  }

  parent () {
    const parents = []
    this.nodes.forEach(function (node) {
      if (!node.parentNode.visited) {
        parents.push(node.parentNode)
        node.parentNode.visited = true;
      }
    })

    parents.forEach(function(node){
      node.visited = false;
    })
    return new DOMNodeCollection(parents)
  }

  find (selector) {
    let foundNodes = [];
    this.forEach(function(node){
      const nodeList = node.querySelectorAll(selector);
      foundNodes = foundNodes.concat(Array.from(nodeList));
    })
    return new DOMNodeCollection(foundNodes);
  }

  remove () {
    this.nodes.forEach(function(node) { node.parentNode.removeChild(node) })
  }
}

module.exports = DOMNodeCollection