import { MARGIN_CONTAINER_LOWEST } from "@/utils/designTokens";

export const useContainerLowestStyle = (type: "view" | "scrollview") => ({
  gap: MARGIN_CONTAINER_LOWEST,
  paddingVertical: MARGIN_CONTAINER_LOWEST,
  flex: type === "view" ? 1 : undefined,
});
