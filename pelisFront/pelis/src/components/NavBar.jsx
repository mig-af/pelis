import { useEffect, useState } from "react";

export function NavBar({ onSearch }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-12 py-4 ${
        scrolled ? "bg-[#0a0a0f]/95 backdrop-blur-xl shadow-lg" : ""
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
              CineStream
            </span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm">
            <a href="#" className="hover:text-red-500 transition font-medium">Inicio</a>
            <a href="#tendencias" className="hover:text-red-500 transition">Películas</a>
            <a href="#series" className="hover:text-red-500 transition">Series</a>
            <a href="#" className="hover:text-red-500 transition">Novedades</a>
            <a href="#" className="hover:text-red-500 transition">Mi Lista</a>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <svg className="w-4 h-4 absolute left-3 top-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Buscar películas..."
              className="bg-white/10 border border-white/20 rounded-full px-4 py-2 pl-10 text-sm w-64 focus:outline-none focus:border-red-500 transition focus:shadow-[0_0_0_3px_rgba(229,9,20,0.3)]"
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
          <button className="relative p-2 hover:bg-white/10 rounded-full transition">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="flex items-center gap-2 cursor-pointer hover:bg-white/10 rounded-full px-2 py-1 transition">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-sm font-bold">
              JD
            </div>
            <svg className="w-4 h-4 hidden md:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </nav>
  );
}