import { useEffect } from "react";

export function MovieModal({ movie, onClose, onOpenPlayer }) {
  useEffect(() => {
    if (!movie) return;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [movie, onClose]);

  if (!movie) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-[8px]"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-[#14141f] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
        style={{ scrollbarWidth: "none", animation: "slideIn 0.4s ease-out" }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 flex items-center justify-center hover:bg-red-600 transition"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="relative h-80 md:h-96">
          <img src={movie.image} alt={movie.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#14141f] via-[#14141f]/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <h2 className="text-4xl md:text-5xl font-bold mb-3">{movie.title}</h2>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-sm">{movie.year}</span>
              <span className="text-gray-400">•</span>
              <span className="text-sm">{movie.duration}</span>
              <span className="text-gray-400">•</span>
              <span className="text-sm flex items-center gap-1">
                <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                {movie.rating}
              </span>
              <span className="border border-white/40 text-xs px-2 py-0.5 rounded">HD</span>
            </div>
          </div>
        </div>
        <div className="p-8">
          <div className="flex gap-3 mb-6">
            <button
              onClick={() => { onClose(); onOpenPlayer(movie.title, movie.id); }}
              className="px-8 py-3 rounded-full font-bold flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 transition-all"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
              Reproducir
            </button>
            <button className="px-6 py-3 rounded-full flex items-center gap-2 bg-white/15 hover:bg-white/25 transition">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              Mi Lista
            </button>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <p className="text-gray-300 leading-relaxed mb-4">{movie.description}</p>
              <div className="flex gap-2 flex-wrap">
                {movie.genre.map((g) => (
                  <span key={g} className="bg-white/10 px-3 py-1 rounded-full text-xs">{g}</span>
                ))}
              </div>
            </div>
            <div className="space-y-3 text-sm">
              <div><span className="text-gray-500">Director: </span><span className="text-gray-200">{movie.director}</span></div>
              <div><span className="text-gray-500">Reparto: </span><span className="text-gray-200">{movie.cast}</span></div>
              <div><span className="text-gray-500">Género: </span><span className="text-gray-200">{movie.genre.join(", ")}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}