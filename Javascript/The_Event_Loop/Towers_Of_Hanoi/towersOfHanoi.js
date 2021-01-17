class Game {
  constructor () {
    this.towers = [[3,2,1],[],[]];
  }
  
  promptMove (reader, callback) {
    this.print();

    reader.question("Enter tower you'd like to move disk from: ", function(start) {
      const startIdx = parseInt(start)
      reader.question("Enter tower you'd like to move disk to: ", function(end){
        const endIdx = parseInt(end)    
          callback(startIdx, endIdx)
      })
    });
  }
  
  print() {
    console.log(JSON.stringify(this.towers));
  }

  makeMove (startIdx, endIdx) {
    if ((startIdx > 0 && startIdx < 3) && (endIdx > 0 && endIdx < 3)) {
      if (this.isValidMove(startIdx, endIdx)){
        let tower1 = this.towers[startIdx];
        let tower2 = this.towers[endIdx];
        let disk = tower1.pop();
        tower2.push(disk)
        return true
      } else {
        return false
      }
    } else {
      return false
    };
  }

  isValidMove (startIdx, endIdx) {
    let tower1 = this.towers[startIdx]
    let tower2 = this.towers[endIdx]

    let disk = tower1[tower1.length - 1]
    let disk2 = tower2[tower2.length - 1]

    
    if (tower1.length === 0){
      return false
    }else if (tower2.length === 0){
      return true
    } else if (disk2 === 'undefined') {
      return true
    } else if (disk < disk2) {
      return true
    } else {
      return false
    };
  }

  isWon() {
    return ((this.towers[2].length == 3) || (this.towers[1].length == 3)) 
  };
  
  run (reader, gameCompletionCallback) {
    let that = this
    this.promptMove(reader, function(startIdx, endIdx){
      if (!that.makeMove(startIdx, endIdx)) {
        console.log('Invalid move!')
      }
    
      if (that.isWon() === false) {
        that.run(reader, gameCompletionCallback);
      } else {
        that.print();
        console.log('You won!');
        gameCompletionCallback();
      };
    });
  }
}

module.exports = Game;




