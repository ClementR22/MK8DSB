export const getBonusColor = (bonusFound) => {
  return bonusFound > 0 ? "#34be4d" : bonusFound < 0 ? "#ff6240" : undefined;
};
