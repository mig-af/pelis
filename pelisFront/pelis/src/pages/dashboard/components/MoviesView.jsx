import { useEffect, useState } from "react";
import styles from "../style/Dashboard.module.css";
import { GridView } from "./GridView";
import { getItems } from "../../../services/moviesService";



const pelis = [
  {
    "title": "Inception",
    "year": "2010",
    "movie_url": "https://example.com/movies/inception",
    "image": "https://example.com/images/inception.jpg",
    "duration": "148 min",
    "description": "Un ladrón especializado en robar secretos del subconsciente ajeno debe implantar una idea en la mente de un empresario, adentrándose en capas cada vez más profundas de sueños compartidos.",
    "director": "Christopher Nolan",
    "cast": "Leonardo DiCaprio, Joseph Gordon-Levitt, Elliot Page",
    "genre": "Ciencia ficción",
    "rating": "8.8"
  },
  {
    "title": "The Shawshank Redemption",
    "year": "1994",
    "movie_url": "https://example.com/movies/shawshank-redemption",
    "image": "https://example.com/images/shawshank.jpg",
    "duration": "142 min",
    "description": "Un banquero condenado injustamente por asesinato forja una amistad inesperada dentro de la prisión mientras planea, con paciencia, recuperar su libertad.",
    "director": "Frank Darabont",
    "cast": "Tim Robbins, Morgan Freeman, Bob Gunton",
    "genre": "Drama",
    "rating": "9.3"
  },
  {
    "title": "Mad Max: Fury Road",
    "year": "2015",
    "movie_url": "https://example.com/movies/mad-max-fury-road",
    "image": "https://example.com/images/madmax.jpg",
    "duration": "120 min",
    "description": "En un desierto post-apocalíptico, una guerrera rebelde se une a un sobreviviente para escapar de un tirano y liberar a un grupo de mujeres cautivas en una persecución sin tregua.",
    "director": "George Miller",
    "cast": "Tom Hardy, Charlize Theron, Nicholas Hoult",
    "genre": "Acción",
    "rating": "8.1"
  },
  {
    "title": "Parasite",
    "year": "2019",
    "movie_url": "https://example.com/movies/parasite",
    "image": "https://example.com/images/parasite.jpg",
    "duration": "132 min",
    "description": "Una familia de bajos recursos se infiltra poco a poco en la vida de una familia adinerada, desencadenando una serie de eventos que exponen las tensiones de clase de forma inesperada.",
    "director": "Bong Joon-ho",
    "cast": "Song Kang-ho, Lee Sun-kyun, Cho Yeo-jeong",
    "genre": "Thriller",
    "rating": "8.6"
  },
  {
    "title": "Spirited Away",
    "year": "2001",
    "movie_url": "https://example.com/movies/spirited-away",
    "image": "https://example.com/images/spiritedaway.jpg",
    "duration": "125 min",
    "description": "Una niña se adentra accidentalmente en un mundo mágico habitado por espíritus, donde debe trabajar en una casa de baños para rescatar a sus padres, transformados en cerdos.",
    "director": "Hayao Miyazaki",
    "cast": "Rumi Hiiragi, Miyu Irino, Mari Natsuki",
    "genre": "Animación",
    "rating": "8.6"
  }
]

export function MoviesView(){

    const [movies, setMovies] = useState([]);
    const [ok, setOK] = useState(false);
    useEffect(()=>{
        async function getMovies(){
            try{
                const resp = await getItems();
                if(resp.status){
                    console.log(resp.status);
                    setMovies(resp.data);
                    setOK(!ok);
                    return
                }

            }catch(error){
                alert("Ocurrio un error");
                console.log(error)

                setMovies(null);
                setOK(!ok);
                return
            }
        }
        getMovies();
    }, [])


   //console.log(movies);

    return(
        
            <div id="moviesView" className="p-8 ">
                {/* <!-- Movies View --> */}
                {/* <!-- Filters & View Toggle --> */}
                
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        {/* <select id="genreFilter" className="input-field px-4 py-2.5 rounded-xl text-sm text-white" onChange="applyFilters()">*/}
                        <select id="genreFilter" className={styles["input-field"] + " px-4 py-2.5 rounded-xl text-sm text-white"}>
                        
                            <option value="">Todos los géneros</option>
                        </select>
                        {/* <select id="yearFilter" className="input-field px-4 py-2.5 rounded-xl text-sm text-white" onChange="applyFilters()">
                             */}
                        <select id="yearFilter" className={styles["input-field"] + " px-4 py-2.5 rounded-xl text-sm text-white"} >
                        
                            <option value="">Todos los años</option>
                        </select>
                        {/* <select id="sortBy" className="input-field px-4 py-2.5 rounded-xl text-sm text-white" onChange="applyFilters()">
                             */}
                        <select id="sortBy" className={styles["input-field"] + " px-4 py-2.5 rounded-xl text-sm text-white"} >
                         
                            <option value="title">Ordenar por Título</option>
                            <option value="year">Ordenar por Año</option>
                            <option value="rating">Ordenar por Rating</option>
                        </select>
                    </div>
                    <div className="flex items-center gap-2">
                        <button 
                            // onclick="setViewMode('grid')" 
                            id="gridBtn" 
                            className="view-toggle active p-2.5 rounded-lg text-gray-400">
                            <i className="fas fa-th-large"></i>
                        </button>
                        <button 
                            // onclick="setViewMode('table')" 
                            id="tableBtn" 
                            className="view-toggle p-2.5 rounded-lg text-gray-400">
                            <i className="fas fa-list"></i>
                        </button>
                    </div>
                </div>

                {/* <!-- Grid View --> */}
                { 
                    !ok ? <p>cargando..</p>:
                    movies.length != 0 ? <GridView movies={movies} />: 
                    <p>No hay datos</p>
                }   

                {/* <!-- Table View --> */}
                <div id="tableView" className="hidden">
                    <div className="overflow-x-auto rounded-2xl border border-white/5">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-white/5">
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Película</th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Año</th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Género</th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Duración</th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Rating</th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Director</th>
                                    <th className="text-right px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Acciones</th>
                                </tr>
                            </thead>
                            <tbody id="movieTableBody">
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* <!-- Empty State --> */}
                <div id="emptyState" className="hidden text-center py-20">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-indigo-500/10 flex items-center justify-center">
                        <i className="fas fa-film text-3xl text-indigo-400"></i>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">No se encontraron películas</h3>
                    <p className="text-gray-400 mb-6">Intenta con otros filtros o agrega una nueva película</p>
                    <button 
                        // onclick="openModal()" 
                        className="btn-primary px-6 py-3 rounded-xl text-sm font-medium">
                        <i className="fas fa-plus mr-2"></i>Agregar Película
                    </button>
                </div>
            </div>
    )
}