import { useRef } from "react";
import { MovieCard } from "./MovieCard";

export function MovieSection({ title, subtitle, movies, onOpenModal, onOpenPlayer }) {
  const ref = useRef(null);

  const scroll = (dir) => {
    ref.current?.scrollBy({ left: dir * ref.current.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <section className="px-6 md:px-12 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
            <span className="w-1 h-8 bg-red-600 rounded-full inline-block" />
            {title}
          </h2>
          {subtitle && <p className="text-gray-400 text-sm mt-1 ml-4">{subtitle}</p>}
        </div>
        <button className="text-sm text-gray-400 hover:text-red-500 transition flex items-center gap-1">
          Ver todo
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      <div className="relative group">
        <button
          onClick={() => scroll(-1)}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 w-12 h-12 rounded-full opacity-0 group-hover:opacity-100 transition flex items-center justify-center bg-black/70 backdrop-blur-md hover:bg-red-600/90"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div
          ref={ref}
          className="flex gap-4 overflow-x-auto pb-4 scroll-smooth"
          style={{ scrollbarWidth: "none" }}
        >
          {movies.map((movie, i) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onOpenModal={onOpenModal}
              onOpenPlayer={onOpenPlayer}
            />
          ))}
        </div>
        <button
          onClick={() => scroll(1)}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 w-12 h-12 rounded-full opacity-0 group-hover:opacity-100 transition flex items-center justify-center bg-black/70 backdrop-blur-md hover:bg-red-600/90"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
}