import { useState } from "react";
import MissileMap from "../components/MissileMap";
import "../assets/SimulationPage.css";
import missileLeft from "../assets/missile.png"; // Your left image
import missileRight from "../assets/agni.png"; // Your right image
import missileData from "../components/missileData";
import ExplosionInfo from "../components/ExplosionInfo";
import { calculateBlastRadii } from "../utlis/blasrRadii";

import { useNavigate } from "react-router-dom";

export default function SimulationPage() {
    const [launch, setLaunch] = useState({ lat: 28.6139, lng: 77.2090 });
    const [target, setTarget] = useState({ lat: 31.2304, lng: 121.4737 });
    const [range, setRange] = useState(4000);
    const [cep, setCep] = useState(20000);
    const [launched, setLaunched] = useState(false);
    const [exploded, setExploded] = useState(false);
    const [selectedMissile, setSelectedMissile] = useState(missileData["India"][0]);
    const [missilePos, setMissilePos] = useState(null);

    const navigate = useNavigate();

    const handleLaunch = () => {
        setLaunched(true);
        setExploded(false);
    };

    const handleMissileChange = (e) => {
        const [country, index] = e.target.value.split("||");
        const missile = missileData[country][index];
        setSelectedMissile(missile);
        setRange(missile.range);
        setCep(missile.cep);
    };

    return (
        <div className="simulation-page-wrapper">
            <img src={missileLeft} alt="Left Missile" className="side-img left-img" />
            <div className="simulation-container">
                <h2>Simulation Setup</h2>

                <div className="input-group">
                    <label>
                        Launch Latitude:
                        <input
                            type="number"
                            value={launch.lat}
                            onChange={(e) => setLaunch({ ...launch, lat: parseFloat(e.target.value) })}
                        />
                    </label>
                    <label>
                        Launch Longitude:
                        <input
                            type="number"
                            value={launch.lng}
                            onChange={(e) => setLaunch({ ...launch, lng: parseFloat(e.target.value) })}
                        />
                    </label>
                    <label>
                        Target Latitude:
                        <input
                            type="number"
                            value={target.lat}
                            onChange={(e) => setTarget({ ...target, lat: parseFloat(e.target.value) })}
                        />
                    </label>
                    <label>
                        Target Longitude:
                        <input
                            type="number"
                            value={target.lng}
                            onChange={(e) => setTarget({ ...target, lng: parseFloat(e.target.value) })}
                        />
                    </label>
                    <label>
                        Select Missile Type:
                        <select onChange={handleMissileChange}>
                            {Object.entries(missileData).map(([country, missiles]) =>
                                missiles.map((missile, index) => (
                                    <option key={missile.name} value={`${country}||${index}`}>
                                        {`${country}: ${missile.name} (${missile.range} km, CEP ${missile.cep} m)`}
                                    </option>
                                ))
                            )}
                        </select>
                    </label>
                </div>

                <button
                    className={`launch-btn ${launched ? "launched" : ""}`}
                    onClick={handleLaunch}
                >
                    {launched ? "LAUNCHED" : "LAUNCH"}
                </button>
                <button
                    className="reset-btn"
                    onClick={() => {
                        setLaunch({ lat: 28.6139, lng: 77.2090 });
                        setTarget({ lat: 31.2304, lng: 121.4737 });
                        setRange(4000);
                        setCep(20000);
                        setLaunched(false);
                        setExploded(false);
                        setSelectedMissile(missile);
                    }}
                >
                    Reset
                </button>

<MissileMap
  launch={launch}
  target={target}
  setLaunch={setLaunch}
  setTarget={setTarget}
  range={range}
  cep={cep}
  launched={launched}
  exploded={exploded}
  setExploded={setExploded}
  yieldMT={selectedMissile?.yield}
  missilePos={missilePos}
  setMissilePos={setMissilePos}
/>

                {exploded && (
                    <div style={{ textAlign: "center", marginTop: "20px" }}>
                        <button
                            onClick={() =>
                                navigate("/info", {
                                    state: {
                                        target,
                                        yieldMT: selectedMissile?.yield,
                                    },
                                })
                            }
                            style={{
                                padding: "12px 24px",
                                backgroundColor: "#2a9d8f",
                                color: "#fff",
                                fontWeight: "bold",
                                border: "none",
                                borderRadius: "8px",
                                cursor: "pointer",
                                fontSize: "16px",
                            }}
                        >
                            View Explosion Info
                        </button>
                    </div>
                )}
                <ExplosionInfo
                    blastRadii={selectedMissile?.yield ? calculateBlastRadii(selectedMissile.yield) : null}
                    yieldMT={selectedMissile?.yield}
                    exploded={exploded}
                    missilePos={missilePos}
                />



            </div>
            <img src={missileRight} alt="Right Missile" className="side-img right-img" />
        </div>
    );
}
