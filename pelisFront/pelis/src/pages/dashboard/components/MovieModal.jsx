import { useState } from "react";
import styles from "../style/Dashboard.module.css";
import { postAddMovie } from "../../../services/moviesService";
import { updateItem } from "../../../services/moviesService";

export function MovieModal({modalHandler, movieInfo}) {
    const isPutHTTPMethod = Boolean(movieInfo.id);

    const [movie, setMovie] = useState({...movieInfo});
    const handleChange = (key, value)=>{
        setMovie(prev => ({ ...prev, [key]:value}));
    }   


    const saveMovie =  ()=>{
        //e.preventDefault()
        const post = async ()=>{
            try{
                const resp = await postAddMovie(movie);
                if(resp.status){
                    alert("Pelicula guardada")
                    console.log(resp.data)
                    return
                }
                console.log(resp.data)

            }catch(error){
                console.log(error)
                alert("No se pudo guardar la pelicula")
                return
            }

        }
        post();
        
    }


    const updateMovie = ()=>{
        //s.preventDefault()
        async function put(){
            try{
                const resp = await updateItem(movie);
                if(resp.status){
                    alert("Pelicula editada correctamente");
                    console.log(resp.data);
                    return
                }
                console.log(resp.data)
            }catch(error){
                console.log(error);
                return
            }
        }
        put();
    }

    const methodHTTPHandler = (e)=>{
        e.preventDefault();
        
        if(isPutHTTPMethod){
            updateMovie(movie);
            return
        }
        saveMovie(movie);
        return
    }

    // console.log(movie);
    console.log("isPutmethod: ", isPutHTTPMethod);
    return (
        // <!-- Modal -->
        <div id="movieModal" className="fixed inset-0 z-50 ">
            <div 
                className={styles["modal-overlay"]+" absolute inset-0"} 
                // onclick="closeModal()"    
            >
                
            </div>
            <div className={styles["modal-content"]+" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl max-h-[90vh] rounded-2xl overflow-y-auto scrollbar-thin"}>
                <div className="sticky top-0 bg-[#1a1a2e] border-b border-white/5 px-8 py-5 flex items-center justify-between z-10">
                    <h3 className="text-xl font-bold text-white" id="modalTitle">{movieInfo.title ? "Editar pelicula" : "Agregar pelicula"}</h3>
                    <button 
                        // onclick="closeModal()"
                        onClick={()=>{
                            modalHandler()
                        }} 
                        className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 transition">
                        <i className="fas fa-times text-gray-400">X</i>
                    </button>
                </div>
                <form 
                    
                    onSubmit={(e)=>{
                        methodHTTPHandler(e);
                    
                    }}
                    id="movieForm" 
                    className="p-8 space-y-5" 
                    // onsubmit="handleSubmit(event)"
                    >
                    <input type="hidden" id="editIndex" value="-1" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-300 mb-2">Título *</label>
                            <input 
                                onChange={(e)=>{
                                    handleChange("title", e.target.value)
                                }}
                                defaultValue={ movieInfo.title ? movieInfo.title : null }
                                type="text" 
                                id="f_title" 
                                required className={styles["input-field"]+" w-full px-4 py-3 rounded-xl text-white text-sm"} 
                                placeholder="Nombre de la película" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Año *</label>
                            <input 
                                onChange={(e)=>{
                                    handleChange("year", e.target.value)
                                }}
                                defaultValue={ movieInfo.year ? movieInfo.year : null }
                                type="number" 
                                id="f_year" 
                                required min="1900" 
                                max="2099"  
                                className={styles["input-field"]+" w-full px-4 py-3 rounded-xl text-white text-sm"} 
                                placeholder="2024" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Duración *</label>
                            <input 
                                onChange={(e)=>{
                                    handleChange("duration", e.target.value)
                                }}
                                defaultValue={ movieInfo.duration ? movieInfo.duration : null }
                                type="text" 
                                id="f_duration" 
                                required className={styles["input-field"]+" w-full px-4 py-3 rounded-xl text-white text-sm"} 
                                placeholder="2h 30min" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Género *</label>
                            <input 
                                onChange={(e)=>{
                                    handleChange("genre", e.target.value)
                                }}
                                defaultValue={ movieInfo.genre ? movieInfo.genre : null }
                                type="text" 
                                id="f_genre" 
                                required className={styles["input-field"]+" w-full px-4 py-3 rounded-xl text-white text-sm"} 
                                placeholder="Acción, Drama" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Rating *</label>
                            <input 
                                onChange={(e)=>{
                                    handleChange("rating", e.target.value)
                                }}
                                defaultValue={ movieInfo.rating ? movieInfo.rating : null }
                                type="number" 
                                id="f_rating" 
                                required min="0"
                                max="10" step="0.1" 
                                className={styles["input-field"]+" w-full px-4 py-3 rounded-xl text-white text-sm"} 
                                placeholder="8.5" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Director *</label>
                            <input 
                                onChange={(e)=>{
                                    handleChange("director", e.target.value)
                                }}
                                defaultValue={ movieInfo.director ? movieInfo.director : null }
                                type="text" 
                                id="f_director" 
                                required className={styles["input-field"]+" w-full px-4 py-3 rounded-xl text-white text-sm"} 
                                placeholder="Nombre del director" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Cast</label>
                            <input 
                                onChange={(e)=>{
                                    handleChange("cast", e.target.value)
                                }}
                                defaultValue={ movieInfo.cast ? movieInfo.cast : null }
                                type="text" 
                                id="f_cast" 
                                className={styles["input-field"]+" w-full px-4 py-3 rounded-xl text-white text-sm"} 
                                placeholder="Actor 1, Actor 2, Actor 3" />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-300 mb-2">URL de la Película</label>
                            <input 
                                onChange={(e)=>{
                                    handleChange("movie_url", e.target.value)
                                }}
                                defaultValue={ movieInfo.movie_url ? movieInfo.movie_url : null }
                                type="url" id="f_movie_url" 
                                className={styles["input-field"]+" w-full px-4 py-3 rounded-xl text-white text-sm"} 
                                placeholder="https://..." />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-300 mb-2">URL de la Imagen</label>
                            <input 
                                onChange={(e)=>{
                                    handleChange("image", e.target.value)
                                }}
                                defaultValue={ movieInfo.image ? movieInfo.image : null }
                                type="url" 
                                id="f_image" 
                                className={styles["input-field"]+" w-full px-4 py-3 rounded-xl text-white text-sm"} 
                                placeholder="https://......" />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-300 mb-2">Descripción</label>
                            <textarea 
                                onChange={(e)=>{
                                    handleChange("description", e.target.value)
                                }}
                                defaultValue={ movieInfo.description ? movieInfo.description : null }
                                id="f_description" 
                                rows="3" 
                                className={styles["input-field"]+" w-full px-4 py-3 rounded-xl text-white text-sm"} 
                                placeholder="Sinopsis de la película..."></textarea>
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/5">
                        <button type="button" 
                            // onclick="closeModal()" 
                            className={styles["btn-secondary"]+" px-6 py-3 rounded-xl text-sm font-medium text-gray-300"}>
                            Cancelar
                        </button>
                        <button 
                            type="submit"
                            className={styles["btn-primary"]+" px-6 py-3 rounded-xl text-sm font-medium text-white"}>
                            <i className="fas fa-save mr-2"></i>
                            <span id="submitBtnText">Guardar Película</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>

    )
}