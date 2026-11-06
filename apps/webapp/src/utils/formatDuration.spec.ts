import { formatDuration } from './formatDuration';

describe('formatDuration', () => {
  it.each([
    [0, '0s'],
    [45, '45s'],
    [60, '1m 0s'],
    [125, '2m 5s'],
    [3600, '1h 0m 0s'],
    [5530, '1h 32m 10s'],
    [59.6, '1m 0s'],
    [-10, '0s'],
  ])('formats %s seconds as "%s"', (input, expected) => {
    expect(formatDuration(input)).toBe(expected);
  });
});
