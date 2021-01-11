export function getTimeString(timestamp) {
  const time = new Date(timestamp);

  const year = pad(time.getFullYear());
  const month = pad(time.getMonth() + 1);
  const date = pad(time.getDate());
  const hours = pad(time.getHours());
  const minutes = pad(time.getMinutes());

  const timeString = `${year}/${month}/${date} ${hours}:${minutes}`;
  return timeString;
}

export function pad(number) {
  if (number < 10) {
    return '0' + number;
  }
  return number;
}
