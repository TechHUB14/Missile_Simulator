import React from "react";
export const BlastInfoPanel = ({ yieldMT }) => {
  if (!yieldMT) return null;

  const effects = {
    fireball: +(0.28 * Math.pow(yieldMT, 0.4)).toFixed(2),
    radiation: +(1.05 * Math.pow(yieldMT, 0.5)).toFixed(2),
    heavyBlast: +(1.2 * Math.pow(yieldMT, 1 / 3)).toFixed(2),
    moderateBlast: +(2.5 * Math.pow(yieldMT, 1 / 3)).toFixed(2),
    thermal: +(4.5 * Math.pow(yieldMT, 0.4)).toFixed(2),
  };

  return (
    <div
      style={{
        backgroundColor: "#1e1e1e",
        color: "#fff",
        padding: "1rem",
        borderRadius: "10px",
        width: "100%",
        maxWidth: "400px",
        marginTop: "1rem",
        fontFamily: "sans-serif",
        boxShadow: "0 0 10px rgba(255,255,255,0.1)",
      }}
    >
      <h3 style={{ marginBottom: "1rem", color: "#ff5e57" }}>
        Effect Distances for a {yieldMT} Megaton Airburst
      </h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li>🔥 <strong>Fireball radius:</strong> {effects.fireball} km</li>
        <li>☢️ <strong>Radiation radius (500 rem):</strong> {effects.radiation} km</li>
        <li>💥 <strong>Heavy blast radius (20 psi):</strong> {effects.heavyBlast} km</li>
        <li>💣 <strong>Moderate blast radius (5 psi):</strong> {effects.moderateBlast} km</li>
        <li>🌡️ <strong>Thermal radiation (3rd-degree burns):</strong> {effects.thermal} km</li>
      </ul>
      <p style={{ marginTop: "1rem", fontSize: "0.9rem", color: "#ccc" }}>
        Based on standard empirical formulas. Ground burst effects may differ.
      </p>
    </div>
  );
};


