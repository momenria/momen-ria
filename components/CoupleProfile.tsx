"use client";

export default function CoupleProfile() {
  return (
    <section className="my-8 py-6 border-y border-stone-200 text-center space-y-6">
      <div>
        <span className="text-xs uppercase tracking-widest text-amber-600 font-medium">
          Mempelai
        </span>
        <h2 className="text-2xl font-serif text-stone-900 mt-1">
          Pasangan Berbahagia
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
        {/* Mempelai Pria */}
        <div className="bg-stone-50 p-5 rounded-xl border border-stone-200">
          <h3 className="font-serif text-xl font-bold text-stone-800">
            Romeo Montague
          </h3>
          <p className="text-xs text-stone-500 mt-2">Putra Pertama dari</p>
          <p className="text-sm font-medium text-stone-700">
            Bpk. Lord Montague & Ibu Lady Montague
          </p>
        </div>

        {/* Mempelai Wanita */}
        <div className="bg-stone-50 p-5 rounded-xl border border-stone-200">
          <h3 className="font-serif text-xl font-bold text-stone-800">
            Juliet Capulet
          </h3>
          <p className="text-xs text-stone-500 mt-2">Putri Tunggal dari</p>
          <p className="text-sm font-medium text-stone-700">
            Bpk. Lord Capulet & Ibu Lady Capulet
          </p>
        </div>
      </div>
    </section>
  );
}