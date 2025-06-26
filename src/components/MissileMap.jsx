import { MapContainer, TileLayer, Marker, Circle, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useMemo, useState } from "react";
import { generateGreatCirclePoints } from "../utlis/greatCircle";
import { getBearing } from "../utlis/geoUtils";

import locationIconUrl from "leaflet/dist/images/marker-icon.png";
import locationShadowUrl from "leaflet/dist/images/marker-shadow.png";
import missileIcon from "../assets/missileicon.png";
import launchSoundFile from "../assets/launch.mp3";
import explosionSoundFile from "../assets/explode.mp3";


// Set default Leaflet marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: locationIconUrl,
    shadowUrl: locationShadowUrl,
});

export default function MissileMap({
    launch,
    target,
    setLaunch,
    setTarget,
    range,
    cep,
    launched,
    exploded,
    setExploded,
    yieldMT,
}) {
    const [missilePos, setMissilePos] = useState(null);
    const [missileAngle, setMissileAngle] = useState(0);
    const [shockwaveRadius, setShockwaveRadius] = useState(0);
    const [showShockwave, setShowShockwave] = useState(false);

    const trajectory = useMemo(
        () => generateGreatCirclePoints(launch, target, 100),
        [launch, target]
    );

    const launchSound = new Audio(launchSoundFile);
    const explosionSound = new Audio(explosionSoundFile);

    const blastRadii = yieldMT
        ? {
            fireball: 0.28 * Math.pow(yieldMT, 0.4) * 1000,
            radiation: 1.05 * Math.pow(yieldMT, 0.5) * 1000,
            heavyBlast: 1.2 * Math.pow(yieldMT, 1 / 3) * 1000,
            moderateBlast: 2.5 * Math.pow(yieldMT, 1 / 3) * 1000,
            thermal: 4.5 * Math.pow(yieldMT, 0.4) * 1000,
        }
        : null;

    // Animate missile
    useEffect(() => {
        if (launched && !exploded) {
            launchSound.play();
            let index = 0;
            const interval = setInterval(() => {
                if (index < trajectory.length) {
                    const pos = trajectory[index];
                    setMissilePos(pos);

                    if (trajectory[index + 1]) {
                        const angle = getBearing(pos, trajectory[index + 1]);
                        setMissileAngle(angle);
                    }

                    index++;
                } else {
                    clearInterval(interval);
                    setMissilePos(null);
                    setExploded(true);
                    explosionSound.play();
                }
            }, 40);

            return () => clearInterval(interval);
        }
    }, [launched, trajectory, setExploded]);

    // Shockwave effect
    useEffect(() => {
        if (exploded) {
            setShockwaveRadius(0);
            setShowShockwave(true);

            let radius = 0;
            const maxRadius = 500000; // in meters
            const interval = setInterval(() => {
                radius += 10000;
                setShockwaveRadius(radius);
                if (radius >= maxRadius) {
                    clearInterval(interval);
                    setShowShockwave(false);
                }
            }, 30);

            return () => clearInterval(interval);
        }
    }, [exploded]);

    const handleLaunchMove = (e) => setLaunch(e.target.getLatLng());
    const handleTargetMove = (e) => setTarget(e.target.getLatLng());

    return (
        <MapContainer
            center={launch}
            zoom={3}
            scrollWheelZoom
            style={{
                width: "100%",
                height: "500px",
                marginTop: "20px",
                borderRadius: "8px",
                overflow: "hidden",
            }}
        >
            <TileLayer
                attribution='&copy; <a href="https://osm.org">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Launch Marker */}
            <Marker position={launch} draggable eventHandlers={{ dragend: handleLaunchMove }} />
            <Circle center={launch} radius={range * 1000} pathOptions={{ color: "blue", weight: 1 }} />

            {/* Target Marker */}
            <Marker position={target} draggable eventHandlers={{ dragend: handleTargetMove }} />
            <Circle center={target} radius={cep} pathOptions={{ color: "red", dashArray: "5 5", weight: 1 }} />

            {/* Missile Path */}
            <Polyline positions={trajectory} pathOptions={{ color: "orange", weight: 2 }} />

            {/* Missile Icon */}
            {missilePos && (
                <Marker
                    position={missilePos}
                    icon={L.divIcon({
                        className: "missile-icon",
                        html: `<img src="${missileIcon}" width="64" height="64" style="transform: rotate(${missileAngle}deg);" />`,
                        iconSize: [64, 64],
                        iconAnchor: [32, 32],
                    })}
                />
            )}

            {/* Explosion Effects */}
            {exploded && missilePos === null && yieldMT && (
                <>
                    <Circle center={target} radius={blastRadii.fireball} pathOptions={{ color: "orange", fillOpacity: 0.4 }} />
                    <Circle center={target} radius={blastRadii.radiation} pathOptions={{ color: "purple", dashArray: "4", fillOpacity: 0.1 }} />
                    <Circle center={target} radius={blastRadii.heavyBlast} pathOptions={{ color: "red", dashArray: "5", fillOpacity: 0.05 }} />
                    <Circle center={target} radius={blastRadii.moderateBlast} pathOptions={{ color: "darkred", dashArray: "5 5", fillOpacity: 0.05 }} />
                    <Circle center={target} radius={blastRadii.thermal} pathOptions={{ color: "yellow", fillOpacity: 0.1 }} />
                </>
            )}

            {/* Shockwave Animation */}
            {exploded && showShockwave && (
                <Circle
                    center={target}
                    radius={shockwaveRadius}
                    pathOptions={{
                        color: "white",
                        weight: 2,
                        fillOpacity: 0,
                        dashArray: "10 10",
                        className: "shockwave-ring",
                    }}
                />
            )}
        </MapContainer>
    );
}
