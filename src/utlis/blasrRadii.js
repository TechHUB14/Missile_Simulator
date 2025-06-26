// src/utils/blastRadii.js
export function calculateBlastRadii(yieldMT) {
  return {
    fireball: 0.28 * Math.pow(yieldMT, 0.4) * 1000,
    radiation: 1.05 * Math.pow(yieldMT, 0.5) * 1000,
    heavyBlast: 1.2 * Math.pow(yieldMT, 1 / 3) * 1000,
    moderateBlast: 2.5 * Math.pow(yieldMT, 1 / 3) * 1000,
    thermal: 4.5 * Math.pow(yieldMT, 0.4) * 1000,
  };
}
