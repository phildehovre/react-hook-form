function findTwoNumbersThatAddTo(array: number[], target: number) {
  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      for (let k = j + 1; k < array.length; k++) {
        if (array[i] + array[j] + array[k] === target) {
          return [array[i], array[j], array[k]];
        }
      }
    }
  }
}

function multiplyArgs(array: number[]) {
  return array.reduce((a, b) => a * b);
}
