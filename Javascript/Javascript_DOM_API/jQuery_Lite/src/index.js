const DOMNodeCollection = require('./dom_node_collection.js');

const _docReadyCallbacks = [];
let _docReady = false;

window.$l = function (arg) {
  if (typeof(arg) === 'object') {
    return new DOMNodeCollection([arg])
  } else if (typeof(arg) === 'string') {
    const nodes = document.querySelectorAll(arg)
    const nodesArray = Array.from(nodes)
    return new DOMNodeCollection(nodesArray)
  } else if (typeof(arg) === 'function') {
    return registerDocReadyCallback(arg);
  }
}

$l.extend = function (base, ...otherObjs) {
  otherObjs.forEach(function(obj){  
    for (const prop in obj) {
      base[prop] = obj[prop];
    }
  })
  return base
}

// couldn't get this working, had to move on 1/28/21 645pm
// $l.ajax = function (options) {
//   const request = new XMLHttpRequest();
//   const defaults = {
//     contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
//     method: 'GET',
//     url: '',
//     success: function(){},
//     error: function(){},
//     data: {},
//   }

//   options = $l.extend(defaults, options);
//   options.method = options.method.toUpperCase();

//   if (options.method === 'GET') {
//     options.url += `?${new URLSearchParams(options.data).toString()}`
//   }

//   request.open(options.method, options.url, true);
//   request.onload = function(e){
//     if (request.status === 200) {
//       options.success(request.response);
//     } else {
//       options.error(request.response);
//     }
//   };

//   request.send(JSON.stringify(options.data))
// }




function registerDocReadyCallback () {
  if (document.readyState !== 'complete') {
    _docReadyCallbacks.push(func);
  } else {
    func();
  }
}

document.addEventListener('DOMContentLoaded', function(){
  if (document.readyState === 'complete') {
    _docReadyCallbacks.forEach(function (func) { 
      func(); 
    })
  }
})