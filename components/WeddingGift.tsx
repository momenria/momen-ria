"use client";

import { useState } from "react";

export default function WeddingGift() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const bankAccounts = [
    {
      id: "bca",
      bank: "Bank BCA",
      number: "1234567890",
      owner: "a.n. Romeo Montague",
    },
    {
      id: "mandiri",
      bank: "Bank Mandiri",
      number: "0987654321",
      owner: "a.n. Juliet Capulet",
    },
  ];

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section className="mt-10 pt-8 border-t border-stone-200 text-center">
      <span className="text-xs uppercase tracking-widest text-amber-600 font-medium">
        Tanda Kasih
      </span>
      <h2 className="text-2xl font-serif text-stone-900 mt-1 mb-2">
        Amplop Digital
      </h2>
      <p className="text-xs text-stone-500 mb-6 max-w-md mx-auto">
        Doa restu Anda merupakan karunia terindah bagi kami. Namun jika memberi adalah ungkapan tanda kasih, Anda dapat mengirimkannya melalui:
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
        {bankAccounts.map((acc) => (
          <div
            key={acc.id}
            className="bg-stone-50 p-4 rounded-xl border border-stone-200 flex flex-col justify-between"
          >
            <div>
              <span className="text-xs font-bold text-amber-800 uppercase">
                {acc.bank}
              </span>
              <p className="text-lg font-mono font-semibold text-stone-900 my-1">
                {acc.number}
              </p>
              <p className="text-xs text-stone-600 mb-3">{acc.owner}</p>
            </div>

            <button
              onClick={() => handleCopy(acc.id, acc.number)}
              className="w-full py-2 bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 text-xs font-medium rounded-lg transition cursor-pointer"
            >
              {copiedId === acc.id ? "✓ Tersalin!" : "Salin Nomor Rekening"}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}