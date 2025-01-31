import { useState, useEffect } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

// Konfigurasi peta
const containerStyle = {
  width: "100%",
  height: "300px",
};

const defaultCenter = {
  lat: -6.200000, // Latitude default (Jakarta)
  lng: 106.816666, // Longitude default (Jakarta)
};

function MapComponent() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyABI573pS7wll87-hiuVuF5hVTf9I7_3qs", 
  });

  const [markerPosition, setMarkerPosition] = useState(defaultCenter);

  // Fungsi untuk menangkap lokasi klik
  const handleMapClick = (event: any) => {
    setMarkerPosition({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
  };

  // Fungsi untuk menangkap lokasi setelah marker digeser
  const handleMarkerDragEnd = (event:any) => {
    setMarkerPosition({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
  };

  // Fungsi untuk mendapatkan lokasi pengguna menggunakan GPS
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setMarkerPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error mendapatkan lokasi:", error);
          alert("Gagal mendapatkan lokasi. Pastikan GPS di perangkat Anda aktif.");
        }
      );
    } else {
      alert("Geolocation tidak didukung oleh browser Anda.");
    }
  };

  // Ambil posisi saat ini ketika pertama kali komponen dimuat
  useEffect(() => {
    getCurrentLocation();
  }, []);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Pinpoint Lokasi</h2>
      <p className="text-sm text-gray-500 mb-4">
        Tandai lokasi untuk mempermudah permintaan pickup kurir
      </p>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded mb-4 cursor-pointer"
        onClick={getCurrentLocation}
        
      >
        Gunakan Lokasi Saat Ini
      </button>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={markerPosition}
        zoom={15}
        onClick={handleMapClick}
      >
        {/* Marker untuk menunjukkan lokasi dan draggable */}
        <Marker
          position={markerPosition}
          draggable={true} // Buat marker bisa digeser
          onDragEnd={handleMarkerDragEnd} // Tangkap posisi setelah marker digeser
        />
      </GoogleMap>
      <div className="mt-4">
        <p className="text-sm">
          Lokasi saat ini: <br />
          Latitude: <strong>{markerPosition.lat.toFixed(6)}</strong>, Longitude:{" "}
          <strong>{markerPosition.lng.toFixed(6)}</strong>
        </p>
      </div>
    </div>
  );
}

export default MapComponent;
