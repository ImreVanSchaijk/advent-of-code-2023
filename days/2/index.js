const fs = require('fs');
const path = require('path');
const Bag = require('./bag');

const parseInput = (input) =>
  input
    .split(/\r?\n/)
    .filter((line) => line.length > 0)
    .reduce((acc, cur) => {
      const {
        groups: { id, games },
      } = /^Game\s(?<id>\d*):\s(?<games>.*?)$/g.exec(cur) || { groups: {} };

      return {
        ...acc,
        [id]: games.split(';').map((game) => {
          const gameOutput = {};
          const sets = game.split(',').map((set) => set.trim());

          sets.forEach((set) => {
            const {
              groups: { number, color },
            } = /^(?<number>[0-9]*)\s(?<color>.*?)$/.exec(set) || { groups: {} };

            if (color === 'red') {
              gameOutput[Bag.colors.RED] = Number(number);
            }

            if (color === 'green') {
              gameOutput[Bag.colors.GREEN] = Number(number);
            }

            if (color === 'blue') {
              gameOutput[Bag.colors.BLUE] = Number(number);
            }
          });

          Object.values(Bag.colors).forEach((color) => {
            if (!gameOutput[color]) {
              gameOutput[color] = 0;
            }
          });

          return gameOutput;
        }),
      };
    }, {});

const input = parseInput(fs.readFileSync(path.resolve(__dirname, './data/input.txt'), 'utf8'));

/**
 *
 * @param {object} game
 * @param {Bag} bag
 */
const playGame = (game, bag) => {
  try {
    Object.entries(game).forEach(([color, cubes]) => {
      bag.remove(color, cubes);
      bag.add(color, cubes);
    });

    return true;
  } catch (e) {
    return false;
  }
};

module.exports.sumPossibleGames = () => {
  const cubeBag = new Bag(12, 13, 14);

  const output = Object.entries(input).reduce((acc, [id, games]) => {
    if (games.every((game) => playGame(game, cubeBag))) {
      return acc + Number(id);
    }
    return acc;
  }, 0);

  return output;
};

const minimumCubes = () => {
  const output = Object.values(input).reduce((acc, game) => {
    const maxRed = Math.max(...game.map((game) => game[Bag.colors.RED]));
    const maxGreen = Math.max(...game.map((game) => game[Bag.colors.GREEN]));
    const maxBlue = Math.max(...game.map((game) => game[Bag.colors.BLUE]));

    return acc + maxRed * maxGreen * maxBlue;
  }, 0);

  return output;
};

module.exports = minimumCubes;
