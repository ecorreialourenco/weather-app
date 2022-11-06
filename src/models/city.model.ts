export interface CityResponse {
  coord: { lon: number; lat: number };
  country: string;
  id: number;
  name: string;
  state: string;
}

export interface CityList {
  id: number;
  name: string;
  country: string;
}

export interface CityOptions {
  id: string;
  label: string;
  name?: string;
  country?: string;
}
