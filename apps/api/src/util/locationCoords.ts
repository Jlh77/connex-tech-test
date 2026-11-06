export type LocationCoords = {
  /** Display name shown in the UI */
  name: string;
  lat: number;
  long: number;
};

export const locationCoords: Record<string, LocationCoords> = {
  manchester: {
    name: 'Manchester',
    lat: 53.4808,
    long: -2.2426,
  },
  melbourne: {
    name: 'Melbourne',
    lat: -37.8136,
    long: 144.9631,
  },
  nigeria: {
    name: 'Nigeria',
    lat: 9.082,
    long: 8.6753,
  },
  durban: {
    name: 'Durban',
    lat: -29.8587,
    long: 31.0218,
  },
  barcelona: {
    name: 'Barcelona',
    lat: 41.3874,
    long: 2.1686,
  },
  miami: {
    name: 'Miami',
    lat: 25.7617,
    long: -80.1918,
  },
};
