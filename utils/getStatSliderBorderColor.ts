import ThemeColor from "@/components/styles/theme.d";

export function getStatSliderBorderColor(number: number, theme: ThemeColor) {
  switch (number) {
    case 0:
      return theme.outline_variant;
    case 1:
      return theme.primary;
    case 2:
      return theme.on_surface;
    default:
      return theme.outline_variant;
  }
}
