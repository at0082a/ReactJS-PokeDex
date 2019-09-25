

function subs(dividend, divisor) {
  let sum = 0;
    for (let i = 1; i < dividend; i += divisor) {
      sum += 1;
    }
    return sum;
}

console.log(subs(10, 3));

