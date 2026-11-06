/**
 * Formats a number of seconds into readable format.
 *
 * @param totalSeconds The total number of seconds to format.
 * @returns A string representing the formatted duration, e.g. "1h 32m 10s" or "45s".
 */
export const formatDuration = (totalSeconds: number): string => {
  const seconds = Math.max(0, Math.round(totalSeconds));
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  if (h > 0) return `${h}h ${m}m ${s}s`;
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
};
