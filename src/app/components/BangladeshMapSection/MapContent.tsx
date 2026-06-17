"use client";

import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";

// --- Color Palette Constants ---
const COLORS = {
  navy: "#002253",
  orange: "#E55503",
};

interface Division {
  name: string;
  position: [number, number];
}

// 1. Define Data (Lat, Lng for Divisions)
const divisions: Division[] = [
  { name: "Rangpur", position: [25.7439, 89.2752] },
  { name: "Rajshahi", position: [24.3636, 88.6241] },
  { name: "Dhaka", position: [23.8103, 90.4125] },
  { name: "Mymensingh", position: [24.7471, 90.4203] },
  { name: "Sylhet", position: [24.8949, 91.8687] },
  { name: "Khulna", position: [22.8456, 89.5403] },
  { name: "Barishal", position: [22.701, 90.3531] },
  { name: "Chittagong", position: [22.3569, 91.7832] },
];

// 2. Custom Component for Map Animation (Fly To Bounds)
function MapAnimator({ bounds }: { bounds: L.LatLngBoundsExpression }) {
  const map = useMap();

  useEffect(() => {
    if (map) {
      // Fly animation: Smoothly zoom and pan to fit Bangladesh
      map.flyToBounds(bounds, {
        padding: [50, 50],
        duration: 1.5,
      });
    }
  }, [map, bounds]);

  return null;
}

// 3. Create Custom Orange Marker Icon
const createCustomIcon = () => {
  return L.divIcon({
    className: "custom-div-icon",
    html: `
      <div style="
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
      ">
        <div style="
          position: absolute;
          width: 24px;
          height: 24px;
          background-color: #E55503;
          border-radius: 50%;
          opacity: 0.4;
          animation: pulse-ring 2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
        "></div>
        
        <div style="
          position: relative;
          width: 12px;
          height: 12px;
          background-color: #002253;
          border: 2px solid white;
          border-radius: 50%;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
          z-index: 10;
        "></div>
      </div>
      
      <style>
        @keyframes pulse-ring {
          0% { transform: scale(0.5); opacity: 0.8; }
          100% { transform: scale(2.5); opacity: 0; }
        }
      </style>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
};

export default function MapContent() {
  // ----------------------------------------------------
  // FIX: useEffect is NOW inside the component function
  // ----------------------------------------------------
  useEffect(() => {
    // Only import on the client
    import("leaflet/dist/leaflet.css");
  }, []);

  // Calculate bounds to center the map roughly on Bangladesh
  const bounds: L.LatLngBoundsExpression = [
    [20.5, 87.5], // Southwest
    [27.0, 93.0], // Northeast
  ];

  return (
    <div
      className="w-full h-[500px] rounded-2xl overflow-hidden shadow-2xl border border-gray-200 bg-gray-100"
      style={{ zIndex: 0 }}
    >
      <MapContainer
        center={[23.685, 90.3563]}
        zoom={7}
        style={{ height: "100%", width: "100%", zIndex: 0 }}
        scrollWheelZoom={false}
      >
        {/* Tile Layer */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          subdomains="abcd"
          maxZoom={19}
        />

        {/* Animation */}
        <MapAnimator bounds={bounds} />

        {/* Markers */}
        {divisions.map((division, index) => (
          <Marker
            key={index}
            position={division.position}
            icon={createCustomIcon()}
          >
            <Popup>
              <div className="text-center">
                <h3 className="font-bold text-[#002253]">{division.name}</h3>
                <p className="text-xs text-gray-500">Operational Base</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
