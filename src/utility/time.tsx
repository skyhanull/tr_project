export default function convertDuration(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.round(seconds % 60);

  return `${hours}시간 ${minutes}분 ${remainingSeconds}초`;
}
