# Omnichannel Dashboard

## Deskripsi

Dashboard analitik untuk memantau performa bisnis lintas channel penjualan, dibangun dengan Next.js + TypeScript. Data diambil dari file CSV, tanpa backend tambahan.

## Fitur Utama

- Ringkasan metrik bisnis: total revenue, net revenue, total order, item, average order value, channel terpopuler.
- Insight otomatis: profit margin, deteksi biaya pengiriman tinggi.
- Visualisasi tren revenue harian (area chart) dan distribusi revenue per channel (pie chart).
- Tabel transaksi lengkap dengan fitur search, filter, dan sorting.
- Responsive dan mudah digunakan.

## Cara Menjalankan

1. Clone repo ini.
2. Jalankan `npm install` untuk install dependencies.
3. Jalankan `npm run dev` untuk development.
4. Buka di browser: [http://localhost:3000](http://localhost:3000)
5. Untuk deploy, bisa langsung ke Vercel/Netlify.

## Cara Pakai

- Lihat metrik dan insight di bagian atas dashboard.
- Analisis tren dan distribusi revenue lewat chart.
- Cari, filter, dan urutkan transaksi di tabel.
- Klik nama pada footer untuk info developer.

## Catatan

- Data diambil dari `/public/import/frontend-engineer-task.csv`.
- Tidak ada fitur edit/hapus data.
- Tidak ada backend, semua berjalan di frontend.

## Developer

- [Naufal Alief](https://github.com/naufalalief) - [LinkedIn](https://www.linkedin.com/in/naufal-alief/)
