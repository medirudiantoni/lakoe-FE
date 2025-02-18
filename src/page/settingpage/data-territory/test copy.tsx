import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Box, Button, Input, Text } from "@chakra-ui/react";

const customIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

function ChangeMapView({ coords }: { coords: [number, number] }) {
  const map = useMap();
  map.setView(coords, 13); // Pindahkan peta ke lokasi baru dengan zoom level 13
  return null;
}

export default function MapComponent() {
  const [coordinates, setCoordinates] = useState<[number, number] | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [input, setInput] = useState("");
  const [searchCoords, setSearchCoords] = useState<[number, number] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
          setCoordinates([latitude, longitude]);
        },
        (error) => {
          console.error("Error obtaining location:", error);
        }
      );
    }
  };

  const searchLocation = async () => {
    if (!input) return;
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://api.biteship.com/v1/maps/areas?countries=ID&input=${encodeURIComponent(input)}&type=single`,
        {
          headers: {
            Authorization: "Bearer biteship_live.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoic2VhcmNoYXBpIiwidXNlcklkIjoiNjdhMjM3ZjA0ODgwMzMwMDEzYWI2NjZlIiwiaWF0IjoxNzM4Njg0ODk0fQ.ywwO5lw50mn0S6zWopKUHY6PgdwvPBvViD4n80ipKxE", // Ganti dengan API Key dari Biteship
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Gagal mengambil data: ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response:", data);

      if (data.areas && data.areas.length > 0) {
        const { latitude, longitude } = data.areas[0]; // Ambil lokasi pertama dari hasil pencarian
        setSearchCoords([latitude, longitude]);
        setCoordinates([latitude, longitude]);
      } else {
        setError("Area tidak ditemukan.");
      }
    } catch (error: any) {
      console.error(error);
      setError(error.message || "Terjadi kesalahan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box mt={4}>
      <Input
        placeholder="Cari area (misal: Jakarta)"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && searchLocation()}
        mb={2}
      />
      <Button onClick={searchLocation} colorScheme="blue" mb={2}>
        Cari Lokasi
      </Button>
      <MapContainer 
  center={userLocation && userLocation[0] !== undefined ? userLocation : [-6.2088, 106.8456]} 
  zoom={13} 
  style={{ height: "300px", width: "100%" }}
>

        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {userLocation && (
          <Marker position={userLocation} icon={customIcon}>
            <Popup>Lokasi Anda</Popup>
          </Marker>
        )}

        {searchCoords && <ChangeMapView coords={searchCoords} />}
        {searchCoords && (
          <Marker position={searchCoords} icon={customIcon}>
            <Popup>Hasil Pencarian</Popup>
          </Marker>
        )}
      </MapContainer>
      <Button onClick={handleGeolocation} colorScheme="green" my={2}>
        Dapatkan Lokasi Saya
      </Button>
      <Box>
        {coordinates ? (
          <Text>
            <strong>Latitude:</strong> {coordinates[0]}, <strong>Longitude:</strong> {coordinates[1]}
          </Text>
        ) : (
          <Text>Klik pada peta atau gunakan tombol untuk mendapatkan koordinat</Text>
        )}
      </Box>
      {error && <Text color="red.500">{error}</Text>}
    </Box>
  );
}
