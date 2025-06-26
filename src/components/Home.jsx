// src/pages/Home.jsx
import { useNavigate } from "react-router-dom";
import "../assets/Home.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1 className="home-title">Missile Trajectory Simulator</h1>
      <p className="home-description">
        Simulate missile paths with precision by selecting real-world coordinates, missiles, and view impact analysis.
      </p>

      <div className="button-group">
        <button className="start-btn" onClick={() => navigate("/simulate")}>
          Start Simulation
        </button>
        <button className="info-btn" onClick={() => navigate("/missiles")}>
          Learn Missiles
        </button>
      </div>
    </div>
  );
}
