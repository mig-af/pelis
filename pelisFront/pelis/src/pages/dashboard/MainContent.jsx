import { useState } from "react";
import styles from "./style/Dashboard.module.css";
import { MovieModal } from "./components/MovieModal";

export function MainContent({view}){

    const [openModal, setOpenModal]=useState(false);
    const modalHandler = ()=>{
        setOpenModal(!openModal);
    }

    return (
        // <!-- Main Content -->
        <main className="flex-1 ml-64">
            {/* <!-- Header --> */}
            <header className="sticky top-0 z-20 bg-[#0f0f1a]/80 backdrop-blur-xl border-b border-white/5">
                <div className="flex items-center justify-between px-8 py-4">
                    <div>
                        <h2 className="text-2xl font-bold text-white" id="pageTitle">Dashboard</h2>
                        <p className="text-sm text-gray-400 mt-1" id="pageSubtitle">Resumen general de tu catálogo</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <input type="text" id="searchInput" placeholder="Buscar películas..." 
                                className={styles["input-field"]+" w-80 pl-10 pr-4 py-2.5 rounded-xl text-sm text-white placeholder-gray-500"}
                                // onInput="handleSearch(this.value)"
                                />
                            <i className="fas fa-search absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500"></i>
                        </div>
                        {/* <button onclick="openModal()" className="btn-primary px-5 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2">
                         */}
                        <button  
                            onClick={()=>{
                                modalHandler()
                            }}
                            className={styles["btn-primary"]+" px-5 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2"}>
                            
                            <i className="fas fa-plus"></i>
                            <span>Nueva Película</span>
                        </button>
                    </div>
                </div>
            </header>
            { openModal && <MovieModal modalHandler={modalHandler} movieInfo={{}}/>  }
            { view }
            {/* <!-- Dashboard View --> */}
            
            {/* <!-- Movies View --> */}
        </main>
    )
}