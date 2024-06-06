export function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
}

export function formatTrackTime(currentTime: number, duration: number) {
  return `${formatTime(currentTime)} / ${formatTime(duration)}`;
}
