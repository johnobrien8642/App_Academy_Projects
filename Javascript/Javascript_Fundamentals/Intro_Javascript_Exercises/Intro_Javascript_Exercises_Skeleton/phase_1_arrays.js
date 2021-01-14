//uniq easy and harder version

// Array.prototype.uniq = function(){
//   let uniq = [];

//   this.forEach(function(el){
//     if (!uniq.includes(el)){
//       uniq.push(el)
//     };
//   });
//   return uniq
// };

Array.prototype.uniq = function(){
  if (this.length > 0){
    uniq = [this[0]]
  } else {
    return []
  };

  this.forEach(function(num){
    matched = false
    uniq.forEach(function(num2){
      if (num===num2){
        matched = true
      }
    });
    if(matched===false){
      uniq.push(num);
    }else{
      matched = false
    };
  });

  return uniq
};

// two_sum

Array.prototype.two_sum = function(){
  pos_pairs = []
  if(this.length<2){
    return pos_pairs;
  };

  for(i=0;i<this.length-1;i++){
    if ((this[i] + this[i+1]) === 0){
      pos_pairs.push([i, i+1])
    }
  };

  return pos_pairs
};

// transpose

Array.prototype.transpose = function(){
  transposed = []

  for(i=0;i<this[0].length;i++){
    transposed.push([])
  }

  for(i=0;i<this.length;i++){
    for(j=0;j<this[0].length;j++){
      transposed[j].push(this[i][j])
    };
  };

  return transposed
};



