export function generateGreatCirclePoints(from, to, steps = 100) {
  const lat1 = deg2rad(from.lat);
  const lon1 = deg2rad(from.lng);
  const lat2 = deg2rad(to.lat);
  const lon2 = deg2rad(to.lng);

  const d = 2 * Math.asin(Math.sqrt(
    Math.pow(Math.sin((lat2 - lat1) / 2), 2) +
    Math.cos(lat1) * Math.cos(lat2) *
    Math.pow(Math.sin((lon2 - lon1) / 2), 2)
  ));

  const points = [];
  for (let i = 0; i <= steps; i++) {
    const f = i / steps;
    const A = Math.sin((1 - f) * d) / Math.sin(d);
    const B = Math.sin(f * d) / Math.sin(d);
    const x = A * Math.cos(lat1) * Math.cos(lon1) + B * Math.cos(lat2) * Math.cos(lon2);
    const y = A * Math.cos(lat1) * Math.sin(lon1) + B * Math.cos(lat2) * Math.sin(lon2);
    const z = A * Math.sin(lat1) + B * Math.sin(lat2);
    const lat = Math.atan2(z, Math.sqrt(x * x + y * y));
    const lon = Math.atan2(y, x);
    points.push([rad2deg(lat), rad2deg(lon)]);
  }

  return points;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}
function rad2deg(rad) {
  return rad * (180 / Math.PI);
}
