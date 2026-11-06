import { Request, RequestHandler, Response } from 'express';
import { GET } from './weather';
import { coordsToTemp } from '../util/coordsToTemp';
import { locationCoords } from '../util/locationCoords';

jest.mock('../util/coordsToTemp');
const mockedCoordsToTemp = jest.mocked(coordsToTemp);

const locations = Object.values(locationCoords);

// Calls the route handler and returns the body passed to res.send
const getWeather = async () => {
  const send = jest.fn();
  await (GET as RequestHandler)(
    {} as Request,
    { send } as unknown as Response,
    jest.fn()
  );
  return send.mock.calls[0][0];
};

describe('GET /weather', () => {
  beforeEach(() => {
    // Give each location a distinct temperature based on its latitude
    mockedCoordsToTemp.mockImplementation(async (lat) => Math.round(lat));
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('resolves every temperature before responding', async () => {
    const body = await getWeather();

    // Unresolved promises serialise to {}, which is the bug this guards against
    expect(JSON.parse(JSON.stringify(body))).toEqual(body);
    body.data.forEach((item: { temp: unknown }) =>
      expect(typeof item.temp).toBe('number')
    );
  });

  it('returns each location by display name with its temperature', async () => {
    const body = await getWeather();

    expect(body).toEqual({
      data: locations.map(({ name, lat }) => ({
        location: name,
        temp: Math.round(lat),
      })),
    });
  });

  it('looks up the temperature for each location', async () => {
    await getWeather();

    expect(mockedCoordsToTemp).toHaveBeenCalledTimes(locations.length);
    locations.forEach(({ lat, long }) =>
      expect(mockedCoordsToTemp).toHaveBeenCalledWith(lat, long)
    );
  });

  it('still returns the other locations when one lookup fails', async () => {
    const [failing, ...others] = locations;
    mockedCoordsToTemp.mockImplementation(async (lat) => {
      if (lat === failing.lat) throw new Error('Network error');
      return Math.round(lat);
    });
    jest.spyOn(console, 'error').mockImplementation(() => undefined);

    const body = await getWeather();

    expect(body.data).toEqual([
      { location: failing.name, temp: null },
      ...others.map(({ name, lat }) => ({
        location: name,
        temp: Math.round(lat),
      })),
    ]);
  });
});
