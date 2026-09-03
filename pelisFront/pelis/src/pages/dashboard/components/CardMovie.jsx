import { useState } from "react"
import { MovieModal } from "./MovieModal";
import styles from "../style/Dashboard.module.css";

export function CardMovie({movie, modalHandler, videoInfoHandler, deleteConfirmationModal}) {
    // const [openModal, setOpenModal] = useState(false);
    // const modalHandle = ()=>{
    //     setOpenModal(!openModal);
    // }

    
    return (
        <div className=" rounded-2xl overflow-hidden group">
            <div className="relative h-52 bg-gradient-to-br from-indigo-900/50 to-purple-900/50 flex items-center justify-center overflow-hidden">
                {movie.image ?
                    <img 
                        src={movie.image} 
                        alt={movie.title} 
                        className="w-full h-full object-cover" 
                        // onError={"<i className=\\'fas fa-film text-5xl text-indigo-400/30\\'></i>"}
                        /> :
                    <i className="fas fa-film text-5xl text-indigo-400/30"></i>
                }
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4 gap-2">
                    
                    {/* {openModal && <MovieModal modalHandler={modalHandle} />} */}

                    <button 
                        onClick={()=>{
                            modalHandler();
                            videoInfoHandler(movie);
                        }}
                        // onclick="editMovie({realIdx})" 
                        className="w-9 h-9 rounded-lg bg-indigo-500/80 flex items-center justify-center hover:bg-indigo-500 transition" title="Editar">
                        <i className="fas fa-edit text-white text-sm"></i>
                    </button>
                    <button 
                        // onclick="deleteMovie({realIdx})"
                        onClick={
                            ()=>{
                                console.log("delete confirmation");
                                videoInfoHandler(movie);
                                deleteConfirmationModal();
                            }
                        } 
                        className="w-9 h-9 rounded-lg bg-red-500/80 flex items-center justify-center hover:bg-red-500 transition" title="Eliminar">
                        <i className="fas fa-trash text-white text-sm"></i>
                    </button>
                    {movie.movie_url ? <a href={movie.movie_url} target="_blank" className="w-9 h-9 rounded-lg bg-green-500/80 flex items-center justify-center hover:bg-green-500 transition" title="Ver"><i className="fas fa-play text-white text-sm"></i></a> : ''}
                </div>
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1">
                    <i className="fas fa-star rating-star text-xs"></i>
                    <span className="text-xs font-semibold text-yellow-400">{movie.rating}</span>
                </div>
            </div>
            <div className="p-4">
                <h4 className="font-semibold text-white text-sm mb-1 truncate">{movie.title}</h4>
                <p className="text-xs text-gray-400 mb-2">{movie.year} · {movie.duration}</p>
                <p className="text-xs text-gray-500 mb-3 line-clamp-2">{movie.description || 'Sin descripción'}</p>
                <div className="flex items-center gap-2 flex-wrap">
                    {movie.genre.split(',').slice(0, 2).map(g => <span className="genre-badge text-xs px-2 py-0.5 rounded-full text-indigo-300">{g.trim()}</span>)}
                </div>
            </div>
        </div>
    )
}