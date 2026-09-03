import { useState } from "react";
import styles from "../style/Dashboard.module.css";
import { deleteItem } from "../../../services/moviesService";

export function DeleteConfirmationModal({ deleteModalHandler, movieData}){
    const [deleteStatus, setDeleteStatus] = useState(false);
    const deleteItem = (id)=>{
        const req = async ()=>{
            try{
                const resp = await deleteItem(id);
                if(resp.status){
                    alert("Elemento eliminado con exito");
                    setDeleteStatus(!deleteStatus);
                    deleteModalHandler()
                    return
                }
            }catch(error){
                console.log(error);
                alert("No se pudo eliminar el elemento");
                return
            }

        }
        req();
    }

    console.log(movieData)
    return (
        // <!-- Delete Confirmation Modal -->
        <div id="deleteModal" className="fixed inset-0 z-50 ">
            <div 
                className={styles["modal-overlay"]+" absolute inset-0"} 
                // onclick="closeDeleteModal()"
                onClick={()=>{
                    deleteModalHandler()
                }}
                >
                
            </div>
            <div className={styles["modal-content"]+" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md rounded-2xl p-8 text-center"}>
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/10 flex items-center justify-center">
                    <i className="fas fa-trash-alt text-2xl text-red-400"></i>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">¿Eliminar película?</h3>
                <p className="text-gray-400 text-sm mb-6">Estás a punto de eliminar "<span id="deleteMovieName" className="text-white font-medium">{movieData.title}</span>". Esta acción no se puede deshacer.</p>
                <div className="flex items-center justify-center gap-3">
                    <button 
                        // onClick="closeDeleteModal()" 
                        onClick={()=>{
                            deleteModalHandler()
                        }}
                        className={styles["btn-secondary"]+" px-6 py-3 rounded-xl text-sm font-medium text-gray-300"}>
                        Cancelar
                    </button>
                    <button 
                        // onClick="confirmDelete()" 
                        onClick={()=>{
                            console.log("click");
                            //console.log(movieData);
                            deleteItem(movieData.id);
                        }}

                        className={styles["btn-danger"]+" px-6 py-3 rounded-xl text-sm font-medium text-white"}>
                        <i className="fas fa-trash mr-2"></i>Eliminar
                    </button>
                </div>
            </div>
        </div>
    )
}