export default function getChipColor(filterChip: string) {
  switch (filterChip) {
    case "FD6":
      return "#f87171"; // bg-red-300
    case "AT4":
      return "#60a5fa"; // bg-blue-300
    case "CE7":
      return "#34d399"; // bg-green-300
    case "fes":
      return "#fbbf24"; // bg-yellow-300
    default:
      return "#d1d5db"; // bg-gray-300
  }
}
