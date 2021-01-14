// myEach

Array.prototype.myEach = function (callback) {
  for (i = 0; i < this.length; i++) {
    callback(this[i]);
  };
};

function Double(num) {
  return num * 2
};

// myMap

Array.prototype.myMap = function (callback) {
  let new_arr = []

  this.myEach(function (element) {
    new_arr.push(callback(element))
  });

  return new_arr
};

// myReduce

Array.prototype.myReduce = function (acc = 0) {

  this.myEach(function (element) {
    acc += element;
  });

  return acc;
};

