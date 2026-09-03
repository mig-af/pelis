import { useEffect, useState } from "react";
import { CardMovie } from "./CardMovie";
import { MovieModal } from "./MovieModal";
import { DeleteConfirmationModal } from "./DeleteConfirmationModal";

export function GridView({movies}){
    
    const [openModal, setOpenModal] = useState(false);
    const [movieData,  setMovieData] = useState({});
    const [deleteConfirmation, setDeleteConfirmation] = useState(false);


    const modalHandler = ()=>{
        setOpenModal(!openModal);
    }
    const videoInfoHandler = (videoInfo) =>{
        setMovieData(videoInfo);
    }
    const deleteConfirmationModal = () => {
        setDeleteConfirmation(!deleteConfirmation);
    }

    // const [moviesData, setMoviesData] = useState(null);

    // useEffect(()=>{
    //     setMovieData(movies);
    //     console.log(moviesData);
    // },[movies])

    // console.log(moviesData);
    return(
        <>
        <div id="gridView" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {  
                
                movies.map((m, i) => (<CardMovie movie={m} modalHandler={modalHandler} videoInfoHandler={videoInfoHandler} deleteConfirmationModal={deleteConfirmationModal}/>))
                
            }
        </div>
        {openModal && <MovieModal modalHandler={modalHandler} movieInfo={movieData}/>}
        {deleteConfirmation && <DeleteConfirmationModal deleteModalHandler={deleteConfirmationModal} movieData={movieData} />}
        </>
    )
}