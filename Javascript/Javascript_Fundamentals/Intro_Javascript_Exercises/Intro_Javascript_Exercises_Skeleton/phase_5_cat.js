// cat class

function Cat(name, owner){
  this.name = name;
  this.owner = owner;

  this.meow = function(){
    console.log(`${this.name} says meow meow meow`)
  }
}

Cat.prototype.cuteStatement = function(){
  console.log(`Everyone loves ${this.name}`)
};

Cat.prototype.meow = function(){
  console.log(`${this.name} says meow!`)
};