const readline = require('readline');

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function addNumbers (sum, numsLeft, completionCallback) {
  if (numsLeft > 0) {
    reader.question('Please enter in a number', function(res){
      const thisNumber = parseInt(res)
    
      sum += thisNumber
      console.log(`Partial sum:${sum}`)
      addNumbers(sum, numsLeft - 1 , completionCallback)
    }); 
    } else {
      printSum(sum)
  }
};

function printSum (sum) {
  console.log('Total sum:' + sum);
  reader.close;
};

addNumbers(0, 5, printSum());