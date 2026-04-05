import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import { useState } from "react";

export default function ProjectInfoModal() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-primary text-primary-foreground rounded-full shadow-lg p-3 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary"
        aria-label="Project Info"
      >
        <Info className="h-6 w-6" />
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <div className="flex items-center gap-2 mb-1">
              <Info className="h-5 w-5 text-primary" />
              <DialogTitle>Project Explanation</DialogTitle>
            </div>
            <DialogDescription>
              Penjelasan singkat tentang insight, prioritas, dan penggunaan
              dashboard.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 mt-2">
            <section>
              <h4 className="font-semibold text-base mb-1 text-foreground">
                What insights you found from the data:
              </h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Channel penjualan paling populer</li>
                <li>
                  Tren pendapatan harian dan distribusi revenue per channel
                </li>
                <li>
                  Jumlah order selesai, profit margin, deteksi shipping fee
                  tinggi
                </li>
                <li>Rata-rata nilai transaksi dan jumlah item terjual</li>
              </ul>
            </section>
            <section>
              <h4 className="font-semibold text-base mb-1 text-foreground">
                What you prioritized:
              </h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>
                  Metrik utama bisnis (revenue, order, item, avg value, channel
                  terpopuler)
                </li>
                <li>Visualisasi tren dan distribusi</li>
                <li>Tabel transaksi yang mudah dicari, difilter, diurutkan</li>
                <li>Insight otomatis (profit margin, shipping fee tinggi)</li>
              </ul>
            </section>
            <section>
              <h4 className="font-semibold text-base mb-1 text-foreground">
                What you intentionally did NOT include:
              </h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Analisis customer (data tidak ada)</li>
                <li>Export/import data, notifikasi, integrasi backend</li>
                <li>Visualisasi/chart yang tidak relevan</li>
                <li>Fitur edit/hapus data</li>
              </ul>
            </section>
            <section>
              <h4 className="font-semibold text-base mb-1 text-foreground">
                How a user would use this daily:
              </h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Melihat ringkasan performa bisnis</li>
                <li>Memantau channel paling efektif dan tren penjualan</li>
                <li>Mendeteksi anomali biaya pengiriman</li>
                <li>Cari/filter/urutkan transaksi untuk analisis detail</li>
                <li>Mengambil keputusan cepat dari insight dashboard</li>
              </ul>
            </section>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
