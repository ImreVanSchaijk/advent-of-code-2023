const fs = require('fs');
const path = require('path');

const nanAssign = (value) => {
  if (!Number.isNaN(+value)) return value;

  return {
    one: '1',
    two: '2',
    three: '3',
    four: '4',
    five: '5',
    six: '6',
    seven: '7',
    eight: '8',
    nine: '9',
  }[value];
};

module.exports = () => {
  const input = fs.readFileSync(path.resolve(__dirname, './input.txt'), 'utf8');

  const numbers = input
    .split('\n')
    .filter((str) => str.length > 0)
    .map((str) => {
      const output = new Array(2);

      const matches = str.match(/([0-9]|one|two|three|four|five|six|seven|eight|nine)/g);

      if (matches) {
        output[0] = nanAssign(matches[0]);
        matches.reverse();
        output[1] = nanAssign(matches[0]);
      }

      return Number(output.join(''));
    });

  console.log(numbers);

  const sum = numbers.reduce((acc, cur) => acc + cur, 0);

  return sum;
};
