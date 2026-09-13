export function Hero({ onOpenModal, onOpenPlayer }) {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://image.qwenlm.ai/public_source/93a62546-d7ea-4881-9a51-5c7b95380c27/14e2f1af5-bb46-4a5e-b018-01290c458038.png"
          alt="Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(10,10,15,0) 0%, rgba(10,10,15,0.6) 50%, #0a0a0f 100%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(10,10,15,0.95) 0%, rgba(10,10,15,0.5) 50%, transparent 100%)" }} />
      </div>

      <div className="relative h-full flex items-center px-6 md:px-12 pt-24">
        <div className="max-w-2xl animate-[fadeIn_0.6s_ease-out]">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded">NUEVO</span>
            <span className="text-sm text-gray-300">•</span>
            <span className="text-sm text-gray-300">2026</span>
            <span className="text-sm text-gray-300">•</span>
            <span className="text-sm text-gray-300">2h 34min</span>
            <span className="text-sm text-gray-300">•</span>
            <span className="border border-white/40 text-xs px-2 py-0.5 rounded">16+</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight">
            Neon<br />
            <span className="text-red-500">Horizon</span>
          </h1>
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-1">
              <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span className="font-bold">9.2</span>
            </div>
            <span className="text-gray-400">|</span>
            <span className="text-gray-300">Ciencia Ficción • Acción • Thriller</span>
          </div>
          <p className="text-lg text-gray-200 mb-8 leading-relaxed">
            En el año 2087, una ciudad futurista se enfrenta a una conspiración que amenaza con destruir la realidad
            misma. Un hacker solitario descubrirá la verdad oculta tras las luces de neón.
          </p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => onOpenPlayer("Neon Horizon", 0)}
              className="px-8 py-3 rounded-full font-bold flex items-center gap-2 transition-all duration-300 bg-gradient-to-r from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 hover:scale-105"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
              Reproducir
            </button>
            <button
              onClick={() => onOpenModal(0)}
              className="px-8 py-3 rounded-full font-bold flex items-center gap-2 bg-white/15 backdrop-blur-md hover:bg-white/25 hover:scale-105 transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Más información
            </button>
            <button className="p-3 rounded-full bg-white/15 backdrop-blur-md hover:bg-white/25 hover:scale-105 transition-all duration-300">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-xs text-gray-400">Desliza</span>
        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}