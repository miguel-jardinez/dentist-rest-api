export interface DirectionsTypesResponse {
  routes: DirectionDetails[];
}

interface DirectionDetails {
  geometry: {
    coordinates: Array<number[]>;
  };
}
