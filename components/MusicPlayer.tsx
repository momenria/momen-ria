"use client";

import { useEffect, useRef, useState } from "react";

export default function MusicPlayer({ autoPlayTrigger }: { autoPlayTrigger: boolean }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (autoPlayTrigger && audioRef.current && !isPlaying) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }, [autoPlayTrigger]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-40">
      <audio
        ref={audioRef}
        loop
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
      />

      <button
        onClick={togglePlay}
        title={isPlaying ? "Jeda Musik" : "Putar Musik"}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-full shadow-lg border transition cursor-pointer ${
          isPlaying
            ? "bg-amber-700 text-white border-amber-800"
            : "bg-white text-stone-800 border-stone-200 hover:bg-stone-50"
        }`}
      >
        <span className="text-xs font-medium">
          {isPlaying ? "⏸ Jeda Musik" : "▶ Putar Musik"}
        </span>
      </button>
    </div>
  );
}