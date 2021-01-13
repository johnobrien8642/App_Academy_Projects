function titleize (arr) {
    let titleized = arr.map(function(name) { 
        return `Mx. ${name} Jingleheimer Schmidt`
    });
    
    titleized.forEach(function(title) {
        console.log(title)
    });
};

function activeVoiceTricks(tricks){
	let ingTest = RegExp(/ing/);
	let validity = true;

	if (typeof(tricks) === 'string'){
		if (ingTest.test(tricks) === false) {
			validity = false;
			return validity
		} else {
			return validity
		}; 
	};

	tricks.forEach(function(trick){
		if (ingTest.test(trick) === false){
			validity = false;
		}; 
	});
	return validity;
};

function Elephant(name, height, tricks){
	
	this.name = name;
	this.height = height;

	if (activeVoiceTricks(tricks)) {
		this.tricks = tricks;
		} else {
		let e = SyntaxError("All tricks must be in active voice, i.e. 'painting a picture' not 'paint a picture'")
		throw e
	};

	this.trumpet = function(){
		console.log(`${this.name} the elephant goes PHRRRRRRR!`);
	};

	this.grow = function(){
		this.height += 12
	};

	this.addTrick = function(trick){
		if (activeVoiceTricks(trick)) {
			this.tricks.push(trick);
		} else {
			let e = SyntaxError("All tricks must be in active voice, i.e. 'painting a picture' not 'paint a picture'")
			throw e
		};
	};

	this.play = function(){
		if (this.tricks.length === 0){
			console.log(`${this.name} has no tricks yet!`)
		};
		
		min = Math.ceil(0);
		max = Math.floor(this.tricks.length);
		rand_num = Math.floor(Math.random() * max)

		console.log(`${this.name} is ${this.tricks[rand_num]}` + '!')
	};
};

Elephant.prototype.paradeHelper = function(){
  console.log(`${this.name} is trotting by!`)
};

function dinerBreakfast() {
  let order = "I'd like cheesy scrambled eggs please.";
  console.log(order);

  return function (food) {
    new_order = order.split(' ');
    new_order.pop();
    new_order.push('and', food, 'please');
    order = new_order.join(' ');
    console.log(order);
  };
};