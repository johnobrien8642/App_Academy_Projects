Function.prototype.inherits = function (parent) {
  var Surrogate = function () {};
  Surrogate.prototype = parent.prototype;
  this.prototype = new Surrogate();
  this.prototype.constructor = this;
};

Function.prototype.objCreateInherits = function (parent) {
  this.prototype = Object.create(parent.prototype);
  this.prototype.constructor = this;
}

function Animal (name) {
  this.name = name
};

Animal.prototype.sayHello = function () {
  console.log('Hello, my name is: ' + this.name)
};

function Dog (name, coatColor) {
  Animal.call(this, name)

  this.coatColor = coatColor;
};

Dog.inherits(Animal);
// also works
// Dog.objCreateInherits(Animal);

Dog.prototype.bark = function () {
  console.log(this.name + ' says woof!')
};

const d = new Dog("Fido", "Black")
const d2 = new Dog("Alfie", "Brown")
const a = new Animal("Trent")


//instance of dog now has access to Animals prototype
d.sayHello();
d.bark();
//dog's proto does not contain sayHello();, does containt bark();
console.log(d.__proto__.hasOwnProperty("sayHello"));
console.log(d.__proto__.hasOwnProperty("bark"));
//animal's proto through dog's proto does contain sayHello(); 
console.log(d.__proto__.__proto__.hasOwnProperty("sayHello"));
//animal's proto directly does not contain bark()
console.log(a.__proto__.hasOwnProperty("bark"));
//animal's proto directly does contain sayHello()
console.log(a.__proto__.hasOwnProperty("sayHello"));