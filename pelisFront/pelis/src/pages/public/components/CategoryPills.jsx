import { useState } from "react";

const categories = ["Todas", "Acción", "Ciencia Ficción", "Comedia", "Drama", "Terror", "Fantasía", "Animación"];

export function CategoryPills() {
  const [active, setActive] = useState("Todas");

  return (
    <section className="px-6 md:px-12 py-8 sticky top-16 z-40 bg-[#0a0a0f]/95 backdrop-blur-xl">
      <div className="flex items-center gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
              active === cat ? "bg-red-600 text-white" : "bg-white/10 hover:bg-red-600 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </section>
  );
}