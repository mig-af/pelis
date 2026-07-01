export function SearchModal({ query, movies, onClose, onOpenModal }) {
  const results = query.length >= 2
    ? movies.filter((m) =>
        m.title.toLowerCase().includes(query.toLowerCase()) ||
        m.genre.some((g) => g.toLowerCase().includes(query.toLowerCase())) ||
        m.director.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  if (query.length < 2) return null;

  return (
    <div
      className="fixed inset-0 z-[150] bg-black/85 backdrop-blur-[8px]"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="max-w-4xl mx-auto mt-24 p-6">
        <div className="bg-[#14141f] rounded-2xl p-6 max-h-[70vh] overflow-y-auto" style={{ scrollbarWidth: "none" }}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold">Resultados de búsqueda</h3>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-red-600 transition"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          {results.length === 0 ? (
            <div className="text-center py-12">
              <svg className="w-16 h-16 mx-auto text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <p className="text-gray-400">No se encontraron resultados</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {results.map((m) => (
                <div
                  key={m.id}
                  className="cursor-pointer group"
                  onClick={() => { onOpenModal(m.id); onClose(); }}
                >
                  <div className="aspect-[2/3] rounded-xl overflow-hidden relative">
                    <img src={m.image} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <h4 className="font-bold text-sm">{m.title}</h4>
                      <p className="text-xs text-gray-300">{m.year}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}