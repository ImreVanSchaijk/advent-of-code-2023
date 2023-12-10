const fs = require('fs');
const path = require('path');

const nanAssign = (value) => {
  if (!Number.isNaN(+value)) {
    return value;
  }

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

const convertString = (str) => {
  let inputString = str;

  const output = new Array(2);

  const allMatches = [];
  let result;

  while (result !== null) {
    result = /([0-9]|(one|two|three|four|five|six|seven|eight|nine))/.exec(inputString);

    if (result === null) {
      break;
    }

    allMatches.push(result[0]);
    inputString = inputString.slice(result.index + 1);
  }

  if (allMatches.length > 0) {
    output[0] = nanAssign(allMatches[0]);
    allMatches.reverse();
    output[1] = nanAssign(allMatches[0]);
  } else {
    throw Error('No matches found');
  }

  return Number(output.join(''));
};

module.exports = () => {
  const input = fs.readFileSync(path.resolve(__dirname, './input.txt'), 'utf8');

  const numbers = input
    .split('\n')
    .filter((str) => str.length > 0)
    .map(convertString);

  const sum = numbers.reduce((acc, cur) => acc + cur, 0);

  return sum;
};

module.exports.convertString = convertString;
