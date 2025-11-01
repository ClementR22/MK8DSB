import { nanoid } from "nanoid";

export const DEFAULT_BUILDS = {
  build1: {
    id: nanoid(8),
    name: "Build (1)",
    dataId: "9-16-30-39",
  },
  build2: {
    id: nanoid(8),
    name: "Build (2)",
    dataId: "15-22-31-42",
  },
};
