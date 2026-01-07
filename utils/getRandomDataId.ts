function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomDataId(numberOfClassesByCategory: number[]) {
  const randomDataIdArray = [];
  let indexStart = 0;
  numberOfClassesByCategory.forEach((numberOfElements) => {
    randomDataIdArray.push(getRandomInt(indexStart, indexStart + numberOfElements - 1));
    indexStart += numberOfElements;
  });

  return randomDataIdArray.join("-");
}
