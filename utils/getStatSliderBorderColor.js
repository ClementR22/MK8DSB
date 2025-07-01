export function getStatSliderBorderColor(number, theme) {
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
