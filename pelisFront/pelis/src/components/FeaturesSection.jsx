const features = [
  {
    icon: (
      <svg className="w-7 h-7 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
    title: "Calidad 4K HDR",
    desc: "Disfruta de tus películas favoritas en la máxima calidad de imagen y sonido Dolby Atmos.",
  },
  {
    icon: (
      <svg className="w-7 h-7 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    title: "Descarga Offline",
    desc: "Descarga tus películas y series para verlas sin conexión a internet, donde quieras.",
  },
  {
    icon: (
      <svg className="w-7 h-7 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "Perfiles Múltiples",
    desc: "Hasta 5 perfiles por cuenta. Cada miembro de la familia con sus preferencias.",
  },
];

export function FeaturesSection() {
  return (
    <section className="px-6 md:px-12 py-16">
      <div className="grid md:grid-cols-3 gap-6">
        {features.map((f) => (
          <div
            key={f.title}
            className="bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-2xl p-8 hover:border-red-500/50 transition"
          >
            <div className="w-14 h-14 rounded-xl bg-red-600/20 flex items-center justify-center mb-4">
              {f.icon}
            </div>
            <h3 className="text-xl font-bold mb-2">{f.title}</h3>
            <p className="text-gray-400 text-sm">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}