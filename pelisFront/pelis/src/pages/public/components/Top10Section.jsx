//import { movies } from "../data/moviesData";

import { movies } from "../data/MoviesData";

export function Top10Section({ onOpenModal }) {
  const top10 = [...movies].sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating)).slice(0, 10);

  return (
    <section className="px-6 md:px-12 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
            <span className="w-1 h-8 bg-red-600 rounded-full inline-block" />
            Top 10 en CineStream
          </h2>
          <p className="text-gray-400 text-sm mt-1 ml-4">Las más populares del mes</p>
        </div>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-4" style={{ scrollbarWidth: "none" }}>
        {top10.map((movie, i) => (
          <div
            key={movie.id}
            className="flex-shrink-0 flex items-end cursor-pointer group"
            onClick={() => onOpenModal(movie.id)}
          >
            <span
              className="text-8xl font-black text-transparent"
              style={{ WebkitTextStroke: "3px #e50914", marginRight: "-20px", zIndex: 1 }}
            >
              {i + 1}
            </span>
            <div className="w-40 md:w-48 aspect-[2/3] rounded-xl overflow-hidden relative transition group-hover:scale-105">
              <img src={movie.image} alt={movie.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <h3 className="font-bold text-sm">{movie.title}</h3>
                <p className="text-xs text-gray-300">{movie.year}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}