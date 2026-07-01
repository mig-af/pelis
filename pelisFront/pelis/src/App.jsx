import { useState } from "react";
//import { movies } from "./data/moviesData";

import { NavBar } from "./components/NavBar";
import { Hero } from "./components/Hero";
import { CategoryPills } from "./components/CategoryPills";
import { MovieSection } from "./components/MovieSection";
import { Top10Section } from "./components/Top10Section";
import { FeaturesSection } from "./components/FeaturesSection";
import { Footer } from "./components/Footer";
import { MovieModal } from "./components/MovieModal";
import { VideoPlayer } from "./components/VideoPlayer";
import { SearchModal } from "./components/SearchModal";
import { movies } from "./data/MoviesData";

export default function App() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [player, setPlayer] = useState(null); // { title, image }
  const [searchQuery, setSearchQuery] = useState("");

  const openModal = (id) => setSelectedMovie(movies.find((m) => m.id === id));
  const closeModal = () => setSelectedMovie(null);

  const openPlayer = (title, id) => {
    const movie = movies.find((m) => m.id === id);
    setPlayer({ title, image: movie?.image ?? "" });
  };
  const closePlayer = () => setPlayer(null);
  
  return (
    <div style={{ background: "#0a0a0f", color: "#fff", overflowX: "hidden", minHeight: "100vh" }}>
      <NavBar onSearch={setSearchQuery} />

      <Hero onOpenModal={openModal} onOpenPlayer={openPlayer} />
      <CategoryPills />

      <MovieSection
        title="Tendencias ahora"
        subtitle="Lo más visto esta semana"
        movies={movies.filter((m) => m.category.includes("trending"))}
        onOpenModal={openModal}
        onOpenPlayer={openPlayer}
      />
      <MovieSection
        title="Acción y Aventura"
        subtitle="Adrenalina pura"
        movies={movies.filter((m) => m.category.includes("action"))}
        onOpenModal={openModal}
        onOpenPlayer={openPlayer}
      />
      <MovieSection
        title="Ciencia Ficción"
        subtitle="Viajes al futuro"
        movies={movies.filter((m) => m.category.includes("scifi"))}
        onOpenModal={openModal}
        onOpenPlayer={openPlayer}
      />
      <MovieSection
        title="Comedia"
        subtitle="Para reír sin parar"
        movies={movies.filter((m) => m.category.includes("comedy"))}
        onOpenModal={openModal}
        onOpenPlayer={openPlayer}
      />
      <MovieSection
        title="Drama"
        subtitle="Historias que conmueven"
        movies={movies.filter((m) => m.category.includes("drama"))}
        onOpenModal={openModal}
        onOpenPlayer={openPlayer}
      />

      <Top10Section onOpenModal={openModal} />
      <FeaturesSection />
      <Footer />

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} onOpenPlayer={openPlayer} />
      )}
      {player && (
        <VideoPlayer title={player.title} image={player.image} onClose={closePlayer} />
      )}
      <SearchModal
        query={searchQuery}
        movies={movies}
        onClose={() => setSearchQuery("")}
        onOpenModal={openModal}
      />
    </div>
  );
}








// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//     </>
//   )
// }

// export default App
