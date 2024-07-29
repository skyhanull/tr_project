interface Waypoint {
  distance: number;
  location: [number, number]; // [longitude, latitude]
  name: string;
}

interface Leg {
  // Define properties of Leg if needed
}

interface Route {
  distance: number;
  duration: number;
  geometry: string;
  legs: Leg[]; // Array of Leg objects
  weight: number;
  weight_name: string;
}

export interface RouteResponse {
  code: string; // Assuming "Ok" is a response code
  routes: Route[];
  uuid: string;
  waypoints: Waypoint[];
}
