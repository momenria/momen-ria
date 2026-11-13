"use client";

import { useEffect, useState } from "react";

interface GuestMessage {
  id: number;
  name: string;
  attendance: "Hadir" | "Tidak Hadir";
  guestsCount: number;
  message: string;
  timestamp: string;
}

// PASTIKAN INI ADALAH URL WEB APP YANG BERAKHIRAN /exec
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx12hqRCFkFTuSUUGmUthgkfJ7ZXWg84zKT9XfESak6uPB4SGuzDj5ascAAIgTaaCZSeg/exec";

export default function RSVP() {
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState<"Hadir" | "Tidak Hadir">("Hadir");
  const [guestsCount, setGuestsCount] = useState(1);
  const [message, setMessage] = useState("");

  const [entries, setEntries] = useState<GuestMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mengambil daftar ucapan dari Google Sheets tanpa terkena cache browser
  const fetchEntries = async () => {
    if (!GOOGLE_SCRIPT_URL.startsWith("https")) {
      setIsLoading(false);
      return;
    }

    try {
      // Menambahkan timestamp unik agar browser selalu mengambil data terbaru (anti-cache)
      const cacheBusterUrl = `${GOOGLE_SCRIPT_URL}?t=${Date.now()}`;
      const res = await fetch(cacheBusterUrl, {
        method: "GET",
        redirect: "follow",
      });

      if (!res.ok) throw new Error("Gagal mengambil data");

      const data = await res.json();
      if (Array.isArray(data)) {
        setEntries(data);
      }
    } catch (error) {
      console.warn("Info fetch:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim() || isSubmitting) return;

    setIsSubmitting(true);

    const payload = {
      name,
      attendance,
      guestsCount: attendance === "Hadir" ? guestsCount : 0,
      message,
    };

    try {
      if (GOOGLE_SCRIPT_URL.startsWith("https")) {
        // Menggunakan mode: "no-cors" dan text/plain agar tidak diblokir browser
        await fetch(GOOGLE_SCRIPT_URL, {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "text/plain;charset=utf-8",
          },
          body: JSON.stringify(payload),
        });
      }

      // Langsung tampilkan ucapan baru di bagian paling atas secara real-time
      const newEntry: GuestMessage = {
        id: Date.now(),
        ...payload,
        timestamp: "Baru saja",
      };

      setEntries((prev) => [newEntry, ...prev]);
      setName("");
      setMessage("");
      setGuestsCount(1);

      // Sinkronisasi ulang dengan Google Sheets setelah 2 detik
      setTimeout(() => {
        fetchEntries();
      }, 2000);
    } catch (error) {
      alert("Terjadi kesalahan saat mengirim ucapan. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="rsvp" className="mt-10 pt-8 border-t border-stone-200 text-left">
      <div className="text-center mb-6">
        <span className="text-xs uppercase tracking-widest text-amber-600 font-medium">
          Buku Tamu & Kehadiran
        </span>
        <h2 className="text-2xl font-serif text-stone-900 mt-1">
          Konfirmasi & Ucapan
        </h2>
      </div>

      {/* Form Input */}
      <form onSubmit={handleSubmit} className="bg-stone-50 p-5 rounded-xl border border-stone-200 space-y-4">
        <div>
          <label className="block text-xs font-medium text-stone-700 mb-1">Nama Lengkap</label>
          <input
            type="text"
            required
            placeholder="Masukkan nama Anda"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-amber-600"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1">Konfirmasi Kehadiran</label>
            <select
              value={attendance}
              onChange={(e) => setAttendance(e.target.value as "Hadir" | "Tidak Hadir")}
              className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-amber-600"
            >
              <option value="Hadir">Hadir</option>
              <option value="Tidak Hadir">Tidak Hadir</option>
            </select>
          </div>

          {attendance === "Hadir" && (
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">Jumlah Tamu</label>
              <select
                value={guestsCount}
                onChange={(e) => setGuestsCount(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-amber-600"
              >
                <option value={1}>1 Orang</option>
                <option value={2}>2 Orang</option>
                <option value={3}>3 Orang</option>
                <option value={4}>4 Orang</option>
              </select>
            </div>
          )}
        </div>

        <div>
          <label className="block text-xs font-medium text-stone-700 mb-1">Ucapan & Doa</label>
          <textarea
            rows={3}
            required
            placeholder="Tuliskan ucapan selamat atau doa untuk kedua mempelai..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-amber-600"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2.5 bg-amber-700 hover:bg-amber-800 disabled:bg-stone-400 text-white text-sm font-medium rounded-lg transition shadow-sm cursor-pointer"
        >
          {isSubmitting ? "Mengirim..." : "Kirim Konfirmasi & Ucapan"}
        </button>
      </form>

      {/* Daftar Ucapan */}
      <div className="mt-6 space-y-3 max-h-72 overflow-y-auto pr-1">
        {isLoading ? (
          <p className="text-center text-xs text-stone-400 py-4">Memuat ucapan...</p>
        ) : entries.length === 0 ? (
          <p className="text-center text-xs text-stone-400 py-4">
            Belum ada ucapan. Jadilah yang pertama memberikan ucapan!
          </p>
        ) : (
          entries.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-sm text-stone-800">{item.name}</span>
                <span
                  className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${
                    item.attendance === "Hadir"
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-stone-200 text-stone-600"
                  }`}
                >
                  {item.attendance} {item.attendance === "Hadir" ? `(${item.guestsCount} org)` : ""}
                </span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">{item.message}</p>
              <span className="block text-[10px] text-stone-400 mt-2">{item.timestamp}</span>
            </div>
          ))
        )}
      </div>
    </section>
  );
}