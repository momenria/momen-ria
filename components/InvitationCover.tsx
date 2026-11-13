"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

interface CoverProps {
  coupleName: string;
  weddingDate: string;
  onOpen: () => void;
}

function GuestNameDisplay() {
  const searchParams = useSearchParams();
  // Mengambil nama tamu dari parameter URL ?to=Nama+Tamu, default ke Bapak / Ibu / Saudara / i
  const guestName = searchParams.get("to") || "Bapak / Ibu / Saudara / i";

  return (
    <p className="text-lg sm:text-xl font-bold text-white tracking-wide mt-1">
      {guestName}
    </p>
  );
}

export default function InvitationCover({
  coupleName,
  weddingDate,
  onOpen,
}: CoverProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/90 backdrop-blur-md transition-opacity duration-700">
      {/* Background motif halus */}
      <div
        className="absolute inset-0 opacity-20 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80')",
        }}
      />

      {/* Kartu Cover Glassmorphism */}
      <div className="relative z-10 max-w-md w-full bg-white/15 backdrop-blur-lg border border-white/25 rounded-3xl p-8 sm:p-10 text-center text-white shadow-2xl">
        <span className="text-xs uppercase tracking-[0.25em] text-stone-200 font-medium">
          The Wedding Of
        </span>

        {/* Nama Mempelai */}
        <h1 className="text-4xl sm:text-5xl font-serif italic my-4 text-white drop-shadow-sm">
          {coupleName}
        </h1>

        <p className="text-sm sm:text-base text-stone-200 font-medium mb-8">
          {weddingDate}
        </p>

        {/* Kotak Nama Tamu */}
        <div className="bg-black/25 border border-white/15 rounded-2xl p-5 mb-8">
          <span className="text-[11px] uppercase tracking-widest text-stone-300 block">
            Kepada Yth.
          </span>
          <Suspense
            fallback={
              <p className="text-lg font-bold text-white mt-1">
                Bapak / Ibu / Saudara / i
              </p>
            }
          >
            <GuestNameDisplay />
          </Suspense>
        </div>

        {/* Tombol Buka Undangan */}
        <button
          onClick={onOpen}
          className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-[#c28e70] hover:bg-[#b07b5d] text-white text-sm font-semibold rounded-full shadow-lg transition transform hover:scale-105 cursor-pointer"
        >
          <span>💌</span>
          <span>Buka Undangan</span>
        </button>
      </div>
    </div>
  );
}