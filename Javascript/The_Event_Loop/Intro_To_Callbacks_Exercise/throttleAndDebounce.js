// myThrottle with examples below
// uncomment everything b/n ln 4 and ln 47 to test myThrottle
//---------------------------------------------------------------
// Function.prototype.myThrottle = function (interval) {
//   // declare a variable outside of the returned function
//   let that = this
//   let tooSoon = false;
//   return function (...args) {
//     // the function only gets invoked if tooSoon is false
//     // it sets tooSoon to true, and uses setTimeout to set it back to
//     // false after interval ms
//     // any invocation within this interval will skip the if 
//     // statement and do nothing
//     if (!tooSoon) {
//       tooSoon = true;
//       setTimeout(() => tooSoon = false, interval);
//       that(...args);
//     }
//   } 
// }

// class Neuron {
//   fire() {
//     console.log("Firing!");
//   }
// }

// // class Neuron {
// //   constructor() {
// //     this.fire = this.fire.myThrottle(500);
// //   }

// //   fire() {
// //     console.log("Firing!");
// //     console.log("Away!");
// //     console.log(1 + 1);
// //   }
// // }

// const neuron = new Neuron();


// neuron.fire = neuron.fire.myThrottle(5000);

// const interval = setInterval(() => {
//   neuron.fire();
// }, 10);


//myDebounce
// uncomment everything below to test myDebounce

// Function.prototype.myDebounce = function (interval) {
//   // declare a variable outside of the returned function
//   let timeout;
//   let that = this;
//   // return a function that takes an arbitrary number of arguments
//   return (...args) => {
//     // declare a function that sets timeout to null and invokes this with args
//     const fnCall = () => {
//       timeout = null;
//       that(...args);
//     }
//     // each time this function is called, it will clear the previous timeout
//     // and create a new one that invokes fnCall after the interval has passed
//     // since the timeout is reset every time the function is invoked, 
//     // fnCall will only be called once the interval has passed without any new 
//     // invocations
//     clearTimeout(timeout);
//     timeout = setTimeout(fnCall, interval);
//   }
// }




// class SearchBar {
//   constructor() {
//     this.query = "";

//     this.type = this.type.bind(this);
//     this.search = this.search.bind(this);
//   }

//   type(letter) {
//     this.query += letter;
//     this.search();
//   }

//   search() {
//     console.log(`searching for ${this.query}`);
//   }
// }

// const searchBar = new SearchBar();

// const queryForHelloWorld = () => {
//   searchBar.type("h");
//   searchBar.type("e");
//   searchBar.type("l");
//   searchBar.type("l");
//   searchBar.type("o");
//   searchBar.type(" ");
//   searchBar.type("w");
//   searchBar.type("o");
//   searchBar.type("r");
//   searchBar.type("l");
//   searchBar.type("d");
// };


// searchBar.search = searchBar.search.myDebounce(5000);

// queryForHelloWorld();
