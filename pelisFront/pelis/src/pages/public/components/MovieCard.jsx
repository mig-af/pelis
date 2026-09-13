export function MovieCard({ movie, onOpenModal, onOpenPlayer }) {
  return (
    <div
      className="flex-shrink-0 w-52 md:w-64 cursor-pointer relative rounded-xl overflow-hidden group transition-all duration-[400ms] hover:scale-[1.08] hover:-translate-y-2 hover:z-10"
      onClick={() => onOpenModal(movie.id)}
    >
      <div className="aspect-[2/3] relative">
        <img src={movie.image} alt={movie.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition" />
        <div className="absolute top-2 left-2">
          <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">HD</span>
        </div>
        <div className="absolute top-2 right-2">
          <button
            className="w-8 h-8 rounded-full bg-black/60 flex items-center justify-center hover:bg-red-600 transition"
            onClick={(e) => e.stopPropagation()}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 translate-y-5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <div className="flex items-center gap-1 mb-2">
            <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <span className="text-sm font-bold">{movie.rating}</span>
          </div>
          <h3 className="font-bold text-sm mb-1">{movie.title}</h3>
          <p className="text-xs text-gray-300 mb-2">{movie.year} • {movie.genre[0]}</p>
          <button
            onClick={(e) => { e.stopPropagation(); onOpenPlayer(movie.title, movie.id); }}
            className="w-full py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1 bg-gradient-to-r from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 transition-all"
          >
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
            Reproducir
          </button>
        </div>
      </div>
    </div>
  );
}