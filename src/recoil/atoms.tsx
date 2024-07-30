import { atom } from "recoil";

interface RoadType {
  address: string;
  filterChip: string;
  chip: string;
  name: string;
  x: string;
  y: string;
}

export const textState = atom<RoadType[]>({
  key: "textState",
  default: [],
});
