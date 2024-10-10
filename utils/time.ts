export function timestampToString(timestamp: number) {
  const fullDate = new Date(timestamp);
  const year = fullDate.getFullYear();
  const month = (fullDate.getMonth() + 1).toString().padStart(2, '0');
  const date = fullDate.getDate().toString().padStart(2, '0');
  const hour = fullDate.getHours().toString().padStart(2, '0');
  const minute = fullDate.getMinutes().toString().padStart(2, '0');

  return `${year}. ${month}. ${date}. ${hour}:${minute}`;
}
