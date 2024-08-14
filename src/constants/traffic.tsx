interface FilterItem {
  name: string;
  code: string;
}

export const FILTER_TRAFFIC: FilterItem[] = [
  { name: "자동차", code: "driving" },
  { name: "도보", code: "walking" },
  { name: "실시간 경로", code: "driving-traffic" },
];
