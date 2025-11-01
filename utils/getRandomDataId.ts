function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomDataId() {
  return [getRandomInt(0, 15), getRandomInt(16, 29), getRandomInt(30, 38), getRandomInt(39, 42)].join("-");
}
