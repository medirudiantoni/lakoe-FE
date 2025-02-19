export function formatRupiah(angka: number | string): string {
  // Konversi input ke string
  let angkaStr = angka.toString();

  // Pisahkan bagian desimal jika ada
  let parts = angkaStr.split('.');
  let bilanganBulat = parts[0];
  let desimal = parts.length > 1 ? ',' + parts[1] : '';

  // Tambahkan titik sebagai pemisah ribuan
  let rupiah = '';
  let count = 0;
  for (let i = bilanganBulat.length - 1; i >= 0; i--) {
    rupiah = bilanganBulat[i] + rupiah;
    count++;
    if (count % 3 === 0 && i !== 0) {
      rupiah = '.' + rupiah;
    }
  }

  // Gabungkan dengan simbol Rupiah
  return `Rp${rupiah}${desimal}`;
}
