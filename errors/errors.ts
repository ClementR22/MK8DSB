import { ScreenName } from "@/contexts/ScreenContext";

export class BuildAlreadyExistsError extends Error {
  target: ScreenName;
  buildName: string;

  constructor(target: ScreenName, buildName?: string) {
    super("buildAlreadyExists");
    this.target = target;
    if (buildName) {
      this.buildName = buildName;
    }
  }
}

export class NameAlreadyExistsError extends Error {
  buildName: string;

  constructor(target: ScreenName, buildName: string) {
    super("nameAlreadyExists");
    this.buildName = buildName;
  }
}
