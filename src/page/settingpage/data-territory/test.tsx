import { useState } from 'react';

const SearchArea = () => {
  const [input, setInput] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchAreas = async () => {
    if (!input) return;
    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        `https://api.biteship.com/v1/maps/areas?countries=ID&input=${encodeURIComponent(input)}&type=single`,
        {
          headers: {
            Authorization:
              'Bearer biteship_live.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoic2VhcmNoYXBpIiwidXNlcklkIjoiNjdhMjM3ZjA0ODgwMzMwMDEzYWI2NjZlIiwiaWF0IjoxNzM4Njg0ODk0fQ.ywwO5lw50mn0S6zWopKUHY6PgdwvPBvViD4n80ipKxE', // Ganti dengan API Key dari Biteship
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Gagal mengambil data: ${response.status}`);
      }

      const data = await response.json();
      console.log('API Response:', data);

      // Pastikan data adalah array (sesuaikan dengan struktur API)
      setResults(Array.isArray(data.areas) ? data.areas : []);
    } catch (error: any) {
      console.error(error);
      setError(error.message || 'Terjadi kesalahan.');
      setResults([]); // Set agar tidak error saat di-map()
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Cari area..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onBlur={fetchAreas} // Panggil API setelah user selesai mengetik
        className="border p-2 w-full"
      />
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <ul>
        {results.length > 0 ? (
          results.map((area, index) => <li key={index}>{area.name}</li>)
        ) : (
          <p>Data tidak ditemukan</p>
        )}
      </ul>
    </div>
  );
};

export default SearchArea;
