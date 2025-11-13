import { BONUS_COLOR, MALUS_COLOR } from "@/constants/Colors";

export const getBonusColor = (bonusFound: number) => {
  return bonusFound > 0 ? BONUS_COLOR : bonusFound < 0 ? MALUS_COLOR : undefined;
};
