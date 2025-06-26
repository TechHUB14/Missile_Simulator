// src/components/ExplosionInfo.jsx
import React from "react";
import "../assets/Info.css";

export default function ExplosionInfo({ blastRadii, yieldMT, exploded, missilePos }) {
  if (!exploded || missilePos !== null || !yieldMT) return null;

  return (
    <div className="info-container">
      <h2>Nuclear Explosion Damage Report</h2>
      <p><strong>Yield:</strong> {yieldMT} Megatons</p>

      <div className="damage-section">
        <div className="damage-card fireball">
          <h3>🔥 Fireball Radius</h3>
          <p>{blastRadii.fireball.toLocaleString()} meters</p>
          <span>Everything vaporized</span>
        </div>
        <div className="damage-card radiation">
          <h3>☢️ Radiation Radius</h3>
          <p>{blastRadii.radiation.toLocaleString()} meters</p>
          <span>Fatal dose within minutes</span>
        </div>
        <div className="damage-card heavy-blast">
          <h3>💥 Heavy Blast Radius</h3>
          <p>{blastRadii.heavyBlast.toLocaleString()} meters</p>
          <span>Severe structural damage</span>
        </div>
        <div className="damage-card moderate-blast">
          <h3>🔊 Moderate Blast Radius</h3>
          <p>{blastRadii.moderateBlast.toLocaleString()} meters</p>
          <span>Broken windows, minor damage</span>
        </div>
        <div className="damage-card thermal">
          <h3>🔥 Thermal Radiation Radius</h3>
          <p>{blastRadii.thermal.toLocaleString()} meters</p>
          <span>3rd-degree burns possible</span>
        </div>
      </div>
    </div>
  );
}
