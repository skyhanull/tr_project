export interface BusStationInfo {
  // 여기에 busStations 배열의 객체 형태를 명시합니다.
  // 예를 들어, 다음과 같은 필드를 포함할 수 있습니다:
  busNumbers: string;
  busType: string;
}

export interface BusStation {
  // 여기에 busStations 배열의 객체 형태를 명시합니다.
  // 예를 들어, 다음과 같은 필드를 포함할 수 있습니다:
  busInfo: BusStationInfo[];
  busStopName: string;
  busStopNumber: string;
  distance: number; // 예를 들어, 거리(미터) 등
}

export interface SubwayStation {
  // 여기에 subwayStations 배열의 객체 형태를 명시합니다.
  // 예를 들어, 다음과 같은 필드를 포함할 수 있습니다:
  exit: string;
  lines: string[];
  stationName: string;
}

export interface Menu {
  // 메뉴 항목의 형태를 명시합니다.
  name: string;
  price: string;
}

export interface PlaceData {
  address: string;
  addressDetail: string;
  backgroundImageUrl: string;
  busStations: BusStation[];
  closedDay: string;
  contactNumber: string;
  description: string;
  filteredTags: string[];
  holiday: string;
  imageUrl: string;
  linkHomepage: string;
  menus: Menu[];
  ogTitle: string;
  ogUrl: string;
  operationTime: string;
  reviewCount: string;
  reviewScore: string;
  reviewTarget: string;
  subwayStations: SubwayStation[];
}
