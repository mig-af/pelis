import { useParams, Link } from "react-router-dom";
import { NavBar } from "../../components/NavBar";
import { MovieSection } from "../../components/MovieSection";
import { GetByGennre, GetByGenre } from "../../data/Service";
import { MovieModal } from "../../components/MovieModal";
import { MovieCard } from "../../components/MovieCard";
import { useEffect, useState } from "react";
import { VideoPlayer } from "../../components/VideoPlayer";



export function GenrePage(){
    const { genre } = useParams();
    //const movies =  GetByGennre(genre);

    const [movies, setMovies] = useState(null);
    useEffect(()=>{
        async function fetchData(){
            console.log("Iniciando fetch");
            const resp = await GetByGennre(genre);
            console.log("Fetch fin");
            setMovies(resp.data)
            console.log(resp.data);
        }
        fetchData();
    },[])
    

    const [selectedMovie, setSelectedMovie] = useState(null);
    const [player, setPlayer] = useState(null); // { title, image }
    const [searchQuery, setSearchQuery] = useState("");
    
    const openModal = (id) => setSelectedMovie(movies.find((m) => m.id === id));
    const closeModal = () => setSelectedMovie(null);
    
    const openPlayer = (title, id) => {
    const movie = movies.find((m) => m.id === id);
        setPlayer({ title, image: movie?.image ?? "", movie_url: movie?.movie_url ?? ""});
      };
    const closePlayer = () => setPlayer(null);
    
    //console.log("jijo", movies);
    
    return (

        <>            
            <div style={{background: "#0a0a0f", color: "#fff", overflowX: "hidden", minHeight: "100vh"}}>
            <NavBar />
            <div className="" style={{width:"90%", margin:"auto"}}>
                <Link to={"/"}>VOLVER</Link>
                <h1>MOVIES PAGE</h1>
                <h2>
                    {genre}
                </h2>
                
                <div style={{display:"flex", gap:"1rem", flexWrap:"wrap"}}>
                    
                    {movies ? movies.map((m, index) => (<MovieCard key={m.id} movie={m} onOpenModal={openModal} onOpenPlayer={openPlayer} />)): "asd"}
                    
                    {/* {moviees ? " si existe movie": "no hay movie"} */}

                </div>
               
            </div>   
        </div>

        {selectedMovie && (
                <MovieModal movie={selectedMovie} onClose={closeModal} onOpenPlayer={openPlayer} />
              )}
        
        {player && ( 
                
                <VideoPlayer title={player.title} movieUrl={player.movie_url} image={player.image} onClose={closePlayer} />
              )}
        </>
        
    )

}