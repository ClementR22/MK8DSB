import { bodyTypeNames } from "@/data/data";

export const computePressableElementsByCategory = (pressableImagesList) => {
  const result = {};
  pressableImagesList.forEach((el) => {
    const changedCategory = bodyTypeNames.includes(el.category) ? "body" : el.category;
    if (!result[changedCategory]) result[changedCategory] = {};
    if (!result[changedCategory][el.classId]) result[changedCategory][el.classId] = [];
    result[changedCategory][el.classId].push(el);
  });
  return result;
};
