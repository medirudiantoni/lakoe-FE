import { Box, Button, Text } from '@chakra-ui/react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useState } from 'react';
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from 'react-leaflet';

const customIcon = new L.Icon({
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

function LocationMarker({
  setCoordinates,
}: {
  setCoordinates: (coords: [number, number] | null) => void;
}) {
  const [position, setPosition] = useState<[number, number] | null>(null);

  useMapEvents({
    click(e) {
      const newPos: [number, number] = [e.latlng.lat, e.latlng.lng];
      setPosition(newPos);
      setCoordinates(newPos);
    },
  });

  return position === null ? null : (
    <Marker position={position} icon={customIcon}>
      <Popup>
        Latitude: {position[0]} <br /> Longitude: {position[1]}
      </Popup>
    </Marker>
  );
}

export default function MapComponent({
  setCoordinates,
}: {
  setCoordinates: (coords: [number, number] | null) => void;
}) {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null
  );
  const [selectedCoordinates, setSelectedCoordinates] = useState<
    [number, number] | null
  >(null);

  const handleGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
          setCoordinates([latitude, longitude]);
          setSelectedCoordinates([latitude, longitude]);
        },
        (error) => {
          console.error('Error obtaining location:', error);
        }
      );
    }
  };

  return (
    <Box mt={4}>
      <MapContainer
        center={userLocation || [-6.2088, 106.8456]}
        zoom={13}
        style={{ height: '300px', width: '100%' }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {userLocation && (
          <Marker position={userLocation} icon={customIcon}>
            <Popup>Lokasi Anda</Popup>
          </Marker>
        )}
        <LocationMarker
          setCoordinates={(coords) => {
            setCoordinates(coords);
            setSelectedCoordinates(coords);
          }}
        />
      </MapContainer>

      <Button onClick={handleGeolocation} colorPalette="blue" my={2}>
        Dapatkan Lokasi Saya
      </Button>

      {selectedCoordinates && (
        <Box mt={2} p={2}>
          <Text>Latitude: {selectedCoordinates[0]}</Text>
          <Text>Longitude: {selectedCoordinates[1]}</Text>
        </Box>
      )}
    </Box>
  );
}
