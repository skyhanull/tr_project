export default function getImageSrc(filterChip: string) {
  switch (filterChip) {
    case "FD6":
      return "/img/foodImg.png"; // Example path for food category
    case "AT4":
      return "/img/locationImg.png"; // Example path for tourist spots
    case "CE7":
      return "/img/cafeImg.png"; // Example path for cafes
    case "fes":
      return "/img/festivalImg.png"; // Example path for festivals
    default:
      return "/img/recommandImg.png"; // Default image path
  }
}
