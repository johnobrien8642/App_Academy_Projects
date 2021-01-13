
function sumOfNPrimes(num) {
	let count = 0;
	let prime_sum = 0;

	if (num < 2){
		return prime_sum
	};

	if (num === 2){
		prime_sum = 2
		return prime_sum
	};

	for (let i=1;i<Infinity;i++) {
		if (isPrime(i)){
			prime_sum += i;
			count++;
		};

		if (count === num) {
			return prime_sum;
		};
	};
};




function isPrime(num) {
	if (num < 0) {
		return false
	}	
	
	if (num === 0) {
		return false
	}
	
	if (num === 1) {
		return false
	}

	if (num === 2) {
		return true
	}
	
	for (i = 2; i < num; i++) {
		if (num % i === 0) {
			return false
		}
	}
	
	return true
}

sumOfNPrimes(4);

isPrime(6);

