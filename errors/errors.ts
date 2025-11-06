export class BuildAlreadyExistsError extends Error {
  buildName: string;

  constructor(buildName: string) {
    super("buildAlreadyExistsWithTheName");
    this.buildName = buildName;
  }
}

export class NameAlreadyExistsError extends Error {
  buildName: string;

  constructor(buildName: string) {
    super("nameAlreadyExists");
    this.buildName = buildName;
  }
}
