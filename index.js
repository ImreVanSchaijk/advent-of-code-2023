const days = require('./days');

const [, , day] = process.argv;
const program = days?.[day];

if (program) {
  const output = program();
  console.log(`Day ${day} output:`, output);
}
