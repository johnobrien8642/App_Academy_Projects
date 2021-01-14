// bubbleSort

Array.prototype.bubbleSort = function () {
  let sorted = false
  let arr = this

  while (sorted === false) {
    sorted = true
    for (i = 0; i < arr.length - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        el1 = arr[i]
        el2 = arr[i + 1]
        arr[i] = el2
        arr[i + 1] = el1
        sorted = false
      };
    };
  };

  return arr
};

// var arr=[1, 15, 14, 8, 9, 7, 6, 10]

// arr.bubbleSort()

String.prototype.subStrings = function () {
  let all_subs = []

  for (i = 0; i < this.length; i++) {
    for (j = 1; j < this.length + 1; j++) {
      sub = this.slice(i, j)
      if (sub !== '') {
        all_subs.push(sub)
      };
    };
  };

  console.log(all_subs)
};

// var s = "hello"

// s.subStrings();