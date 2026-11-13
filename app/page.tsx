"use client";

import { useState } from "react";
import InvitationCover from "@/components/InvitationCover";
import Countdown from "@/components/Countdown";
import CoupleProfile from "@/components/CoupleProfile";
import Gallery from "@/components/Gallery";
import WeddingGift from "@/components/WeddingGift";
import RSVP from "@/components/RSVP";
import MusicPlayer from "@/components/MusicPlayer";

export default function Home() {
  const [isOpened, setIsOpened] = useState(false);

  const handleOpenInvitation = () => {
    setIsOpened(true);
  };

  return (
    <main className="min-h-screen bg-stone-50 text-stone-800 flex flex-col items-center justify-center p-4 sm:p-6 text-center">
      {/* Cover Depan (Hilang setelah tombol Buka Undangan diklik) */}
      {!isOpened && (
        <InvitationCover
          coupleName="Romeo & Juliet"
          weddingDate="12 Desember 2026"
          onOpen={handleOpenInvitation}
        />
      )}

      {/* Pemutar Musik Latar */}
      <MusicPlayer autoPlayTrigger={isOpened} />

      {/* Konten Utama Undangan (Muncul setelah cover dibuka) */}
      {isOpened && (
        <div className="max-w-xl w-full bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-stone-100 animate-fadeIn">
          <span className="text-sm uppercase tracking-widest text-amber-600 font-medium">
            Undangan Pernikahan
          </span>

          <h1 className="text-4xl md:text-5xl font-serif text-stone-900 mt-4 mb-2">
            Romeo & Juliet
          </h1>

          <p className="text-stone-500 italic mb-6">
            Kami mengundang Anda untuk berbagi kebahagiaan di hari istimewa kami.
          </p>

          {/* Component Countdown Timer */}
          <Countdown targetDate="2026-12-12T09:00:00" />

          {/* Profil Mempelai */}
          <CoupleProfile />

          {/* Detail Acara */}
          <div className="bg-stone-50 p-6 rounded-xl border border-stone-200 mb-8 space-y-2">
            <p className="font-semibold text-lg text-stone-800">
              Sabtu, 12 Desember 2026
            </p>
            <p className="text-stone-600 text-sm">Pukul 09.00 WIB - Selesai</p>
            <p className="text-stone-500 text-xs mt-2">
              Gedung Serbaguna Jakarta
            </p>
          </div>

          {/* Tombol Aksi */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="#rsvp"
              className="px-6 py-3 bg-amber-700 hover:bg-amber-800 text-white rounded-lg font-medium transition shadow-sm"
            >
              Konfirmasi Kehadiran
            </a>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-stone-200 hover:bg-stone-300 text-stone-700 rounded-lg font-medium transition"
            >
              Lihat Lokasi
            </a>
          </div>

          {/* Galeri Foto */}
          <Gallery />

          {/* Amplop Digital */}
          <WeddingGift />

          {/* Section RSVP & Buku Tamu */}
          <RSVP />
        </div>
      )}

      <footer className="mt-8 text-xs text-stone-400">
        Powered by <span className="font-semibold text-stone-600">Momen Ria</span>
      </footer>
    </main>
  );
}