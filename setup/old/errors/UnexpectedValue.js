function UnexpectedValue(value, index, adjacentKeys = [], line) {
  if (!(this instanceof UnexpectedValue)) {
    return new UnexpectedValue(value, index, adjacentKeys, line);
  }

  this.value = value;
  this.adjacentKeys = adjacentKeys;
  this.index = index;
  this.line = line;
}

module.exports = UnexpectedValue;
