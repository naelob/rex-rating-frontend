import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const center: [number, number] = [41.0082, 28.9784];

const MapComponent: React.FC = () => {
  return (
    <MapContainer center={center} zoom={13} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {/* Markers for restaurants */}
      {/* Example Marker */}
      <Marker position={[41.0082, 28.9784]}>
        <Popup>
          A restaurant in Istanbul.
        </Popup>
      </Marker>
      {/* Add more markers here */}
    </MapContainer>
  );
};

export default MapComponent;
