//w/o rest operator
function spliceSum () {
  args = Array.prototype.slice.call(arguments);
  
  let sum = 0
  args.forEach(function(num){
    sum += num
  })

  console.log(sum);
}

// spliceSum(1, 2, 3, 4);
// spliceSum(1, 2, 3, 4, 5);

//with rest operator
function restSum (...args) {
  let sum = 0
  
  args.forEach(function (num) {
    sum += num
  })

  console.log(sum);
}

// restSum(1, 2, 3, 4);
// restSum(1, 2, 3, 4, 5);

Function.prototype.myBindSplice = function (ctx) {
  const fn = this;
  const bindArgs = Array.from(arguments).slice(1)
  return function _boundFn() {
    const callArgs = Array.from(arguments);
      return fn.apply(ctx, bindArgs.concat(callArgs));
  };
};

Function.prototype.myBindRest = function (ctx, ...bindArgs) {
  return (...callArgs) => {
    return this.apply(ctx, bindArgs.concat(callArgs));
  };
};

class Cat {
  constructor(name) {
    this.name = name;
  }

  says(sound, person) {
    console.log(`${this.name} says ${sound} to ${person}!`);
    return true;
  }
}

class Dog {
  constructor(name) {
    this.name = name;
  }
}

const markov = new Cat("Markov");
const pavlov = new Dog("Pavlov");

// markov.says("meow", "Ned");
// // Markov says meow to Ned!
// // true

// // bind time args are "meow" and "Kush", no call time args
// markov.says.myBindSplice(pavlov, "meow", "Kush")();
// // Pavlov says meow to Kush!
// // true

// // no bind time args (other than context), call time args are "meow" and "a tree"
// markov.says.myBindRest(pavlov)("meow", "a tree");
// // Pavlov says meow to a tree!
// // true

// // bind time arg is "meow", call time arg is "Markov"
// markov.says.myBindRest(pavlov, "meow")("Markov");
// // Pavlov says meow to Markov!
// // true

// // no bind time args (other than context), call time args are "meow" and "me"
// const notMarkovSays = markov.says.myBindRest(pavlov);
// notMarkovSays("meow", "me");



function curriedSum (numArgs) {
  const numbers = [];

  function _curriedSum (num) {
    numbers.push(num)

    if (numbers.length === numArgs) {
      let total = 0;

      numbers.forEach(function(num){
        total += num
      });

      return total;
    } else {
      return _curriedSum;
    }
  }

  return _curriedSum;
};


// const sum = curriedSum(3);
// console.log(sum(4));
// console.log(sum(5));
// console.log(sum(6));


Function.prototype.curry = function (nArgs) {
  const args = [];
  const fn = this;

  function _curriedFn (arg) {
    args.push(arg);

    if (args.length === nArgs) {
      return fn(...args);
    } else {
      return _curriedFn;
    }
  }

  return _curriedFn;
};


function sumThree(num1, num2, num3) {
  return num1 + num2 + num3;
}

// const f1 = sumThree.curry(3);
// console.log(f1(4));
// console.log(f1(5));
// console.log(f1(6));