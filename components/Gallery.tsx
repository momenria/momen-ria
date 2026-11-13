"use client";

export default function Gallery() {
  // Daftar foto placeholder (bisa nanti diganti dengan link foto asli)
  const photos = [
    { id: 1, title: "Momen Kebersamaan", url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80" },
    { id: 2, title: "Hari Bahagia", url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80" },
    { id: 3, title: "Pra-Nikah", url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=600&q=80" },
  ];

  return (
    <section className="mt-10 pt-8 border-t border-stone-200 text-left">
      <div className="text-center mb-6">
        <span className="text-xs uppercase tracking-widest text-amber-600 font-medium">
          Galeri Kami
        </span>
        <h2 className="text-2xl font-serif text-stone-900 mt-1">
          Momen Indah Berdua
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {photos.map((photo) => (
          <div key={photo.id} className="overflow-hidden rounded-xl border border-stone-200 shadow-xs bg-stone-100 group">
            <div className="aspect-square relative overflow-hidden">
              <img
                src={photo.url}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}