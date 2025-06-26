export function getBearing(start, end) {
  const lat1 = start.lat * (Math.PI / 180);
  const lat2 = end.lat * (Math.PI / 180);
  const dLon = (end.lng - start.lng) * (Math.PI / 180);

  const y = Math.sin(dLon) * Math.cos(lat2);
  const x =
    Math.cos(lat1) * Math.sin(lat2) -
    Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);

  const brng = Math.atan2(y, x);
  return (brng * 180) / Math.PI;
}
