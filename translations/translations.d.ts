import "react-i18next";
import { ResourcesType } from "./resources";

declare module "react-i18next" {
  interface CustomTypeOptions {
    resources: ResourcesType["en"];
  }
}
