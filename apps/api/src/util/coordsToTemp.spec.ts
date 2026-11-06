import axios from 'axios';
import { coordsToTemp } from './coordsToTemp';

jest.mock('axios');
const mockedGet = jest.mocked(axios.get);

describe('coordsToTemp', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('requests the current temperature for the given coordinates', async () => {
    mockedGet.mockResolvedValue({
      data: { current: { temperature_2m: 12.3 } },
    });

    await coordsToTemp(53.4808, -2.2426);

    const url = new URL(mockedGet.mock.calls[0][0]);
    expect(url.origin + url.pathname).toBe(
      'https://api.open-meteo.com/v1/forecast'
    );
    expect(url.searchParams.get('latitude')).toBe('53.4808');
    expect(url.searchParams.get('longitude')).toBe('-2.2426');
    expect(url.searchParams.get('current')).toBe('temperature_2m');
  });

  it('returns the current temperature from the response', async () => {
    mockedGet.mockResolvedValue({
      data: { current: { temperature_2m: 12.3 } },
    });

    await expect(coordsToTemp(0, 0)).resolves.toBe(12.3);
  });

  it('rejects when the request fails', async () => {
    mockedGet.mockRejectedValue(new Error('Network error'));

    await expect(coordsToTemp(0, 0)).rejects.toThrow('Network error');
  });
});
