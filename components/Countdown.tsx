"use client";

import { useEffect, useState } from "react";

export default function Countdown({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const target = new Date(targetDate).getTime();

    // Jalankan sekali langsung agar tidak ada jeda 1 detik di awal
    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="grid grid-cols-4 gap-2 text-center my-6">
      <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
        <span className="block text-2xl font-bold text-amber-900">{timeLeft.days}</span>
        <span className="text-xs text-amber-700 font-medium">Hari</span>
      </div>
      <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
        <span className="block text-2xl font-bold text-amber-900">{timeLeft.hours}</span>
        <span className="text-xs text-amber-700 font-medium">Jam</span>
      </div>
      <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
        <span className="block text-2xl font-bold text-amber-900">{timeLeft.minutes}</span>
        <span className="text-xs text-amber-700 font-medium">Menit</span>
      </div>
      <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
        <span className="block text-2xl font-bold text-amber-900">{timeLeft.seconds}</span>
        <span className="text-xs text-amber-700 font-medium">Detik</span>
      </div>
    </div>
  );
}