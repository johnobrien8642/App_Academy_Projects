// range

function range(start, end){
  if(start===end){
    return [];
  }

  let r = range(start, end-1);
  r.push(end-1);
  return r;
};

// sumRecursively

function recSum(arr){
  if (arr.length===0){
    return 0;
  }

  let lastNum = arr[arr.length-1];
  return recSum(arr.slice(0, arr.length-1)) + lastNum;
}

// exponent

function exponent(base, exp){

  if (exp===1){
    return base
  };

  return exponent(base, exp-1) * base
};

// fibonnacci 

function fibonnacci(num){
  if (num<=0){
    return []
  };

  if(num===1){
    return [0]
  };
  
  if (num === 2) {
    return [0, 1]
  };

  let f = fibonnacci(num-1)
  num1 = f[f.length-2]
  num2 = f[f.length-1]
  f.push(num1+num2)
  return f
};

// deep dup

function deepDup(arr){
  if(!(arr instanceof Array)){
    return arr
  };

  return arr.map(function(el){
    return deepDup(el)
  });
};

// bsearch

function bsearch(numbers, target){
  if(numbers.length===0){
    return -1
  };
  
  const probeIdx = Math.floor(number.length/2);
  const probe = numbers[probeIdx];

  if (probe===target){
    return probeIdx
  }else if(target<probe){
    const left = numbers.slice(0, probeIdx)
    return bsearch(left, target)
  }else{
    const right = numbers.slice(probeIdx+1)
    const subProblem = bsearch(right, target)

    return subProblem -1 ? -1 : subProblem + (probeIdx + 1)
  };
};

// mergeSort

function merge(left, right){
  const merged = []

  while(left.length > 0 && right.length > 0){
    let nextItem = (left[0] < right[0]) ? left.shift(); : right.shift();
      merged.push(nextItem);
  };

  return merged.concat(left, right);
};

function mergeSort(arr){
  if (arr.length < 2){
    return arr;
  }else{
    const pivot = Math.floor(arr.length/2);
    
    const left = mergeSort(arr.slice(0, pivot));
    const right = mergeSort(arr.slice(pivot));

    return merge(left, right);
  };
};

// subsets

function subSets(arr){
  if(arr.length===0){
    return [[]];
  }

  const first = arr[0];
  const withoutFirst = subSets(arr.slice(1));
  const withFirst = withoutFirst.map(function(sub){
    return [first].concat(sub)
  });

  return withoutFirst.concat(withFirst);
};



