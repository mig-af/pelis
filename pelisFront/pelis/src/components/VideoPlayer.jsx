import { useState, useEffect, useRef } from "react";

export function VideoPlayer({ title, image, onClose }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === " ") { e.preventDefault(); togglePlay(); }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      clearInterval(intervalRef.current);
    };
  }, []);

  const togglePlay = () => {
    setIsPlaying((prev) => {
      if (!prev) {
        intervalRef.current = setInterval(() => {
          setProgress((p) => {
            if (p >= 100) { clearInterval(intervalRef.current); return 0; }
            return p + 0.1;
          });
        }, 100);
      } else {
        clearInterval(intervalRef.current);
      }
      return !prev;
    });
  };

  const totalSeconds = 9240;
  const currentSeconds = Math.floor((progress / 100) * totalSeconds);
  const h = Math.floor(currentSeconds / 3600);
  const m = Math.floor((currentSeconds % 3600) / 60);
  const s = currentSeconds % 60;
  const timeStr = `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;

  const seek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setProgress(((e.clientX - rect.left) / rect.width) * 100);
  };

  const PlayIcon = () => (
    <svg className="w-12 h-12 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
  );
  const PauseIcon = () => (
    <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24"><path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" /></svg>
  );

  return (
    <div className="fixed inset-0 z-[200] bg-black">
      <div className="relative w-full h-full flex items-center justify-center">
        <img src={image} className="absolute inset-0 w-full h-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/30" />

        <div className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between z-10">
          <button onClick={onClose} className="flex items-center gap-2 hover:text-red-500 transition">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-medium">Volver</span>
          </button>
          <h3 className="font-bold text-lg">{title}</h3>
          <div />
        </div>

        <button
          onClick={togglePlay}
          className="relative z-10 w-24 h-24 rounded-full bg-red-600 flex items-center justify-center hover:scale-110 transition"
          style={{ boxShadow: "0 0 0 0 rgba(229,9,20,0.7)", animation: "pulse-ring 2s infinite" }}
        >
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </button>

        <div className="absolute bottom-0 left-0 right-0 p-6 z-10"
          style={{ background: "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.8) 100%)" }}
        >
          <div className="mb-4">
            <div
              className="relative w-full h-1 bg-white/30 rounded-full cursor-pointer"
              onClick={seek}
            >
              <div className="h-full rounded-full bg-gradient-to-r from-red-600 to-red-400" style={{ width: `${progress}%` }} />
              <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-red-600 rounded-full shadow-lg" style={{ left: `${progress}%` }} />
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-2">
              <span>{timeStr}</span>
              <span>2:34:00</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={togglePlay} className="hover:text-red-500 transition">
                {isPlaying ? (
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" /></svg>
                ) : (
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                )}
              </button>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
                <input type="range" className="w-20" min="0" max="100" defaultValue="80" />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="hover:text-red-500 transition text-sm font-medium">Subtítulos</button>
              <button className="hover:text-red-500 transition text-sm font-medium">1x</button>
              <button className="hover:text-red-500 transition">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}