const day1 = require('./days/1');

const [, , day] = process.argv;
const program = [day1]?.[day - 1];

if (program) {
  const output = program();
  console.log(`Day ${day} output:`, output);
}
