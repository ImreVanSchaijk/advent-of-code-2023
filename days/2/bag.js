const colors = {
  RED: 0,
  GREEN: 1,
  BLUE: 2,
};

module.exports = class Bag {
  constructor(redNumber = 0, greenNumber = 0, blueNumber = 0) {
    this.contents = {
      [colors.RED]: redNumber,
      [colors.GREEN]: greenNumber,
      [colors.BLUE]: blueNumber,
    };
  }

  add(color = colors.RED, number) {
    this.contents[color] += number;
  }

  remove(color = colors.RED, number, throwOnNegative = true) {
    const newTotal = this.contents[color] - number;

    if (newTotal >= 0) {
      this.contents[color] = newTotal;
    } else {
      if (throwOnNegative) {
        throw new Error('Cannot remove more cubes than are in the bag');
      } else {
        this.contents[color] = newTotal;
      }
    }
  }

  set(color = colors.RED, number) {
    this.contents[color] = number;
  }

  check() {
    return this.contents;
  }
};

module.exports.colors = colors;
