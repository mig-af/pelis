import { useState } from 'react';
import styles from './style/Dashboard.module.css';
import { MovieModal } from './components/MovieModal';

export function Sidebar({setMainView}){

    const [openModal, setOpenModal] = useState(false);
    const modalHandler = ()=>{
        setOpenModal(!openModal);
    }

    return(
        
        <aside className= {styles.sidebar+ " w-64 fixed h-full flex flex-col z-30 border-r border-white/5"}>
            {/* // <!-- Sidebar --> */}
            <div className="p-6 border-b border-white/5">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                        <i className="fas fa-film text-white text-lg"></i>
                    </div>
                    <div>
                        <h1 className="text-lg font-bold text-white">MovieAdmin</h1>
                        <p className="text-xs text-gray-400">Panel de Control</p>
                    </div>
                </div>
            </div>
            
            <nav className="flex-1 py-4">
                <div className="px-4 mb-2">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Principal</span>
                </div>
                {/* <a href="#" className="nav-item active flex items-center gap-3 px-6 py-3 text-sm text-gray-300" onclick="switchView('dashboard')"> */}
                <a 
                    href="#" 
                    className={styles["nav-item"]+" active flex items-center gap-3 px-6 py-3 text-sm text-gray-300"} 
                    onClick={()=>{
                        setMainView("dashboardView");
                    }
                    }>
                
                    <i className="fas fa-chart-pie w-5 text-center text-indigo-400"></i>
                    <span>Dashboard</span>
                </a>
                <a href="#" className={styles["nav-item"]+" active flex items-center gap-3 px-6 py-3 text-sm text-gray-300"} 
                    onClick={()=>{
                        setMainView("moviesView")
                    }}
                >
                    <i className="fas fa-film w-5 text-center text-indigo-400"></i>
                    <span>Películas</span>
                </a>

                <a href="#" 
                    // onclick="openModal()"
                    onClick={()=>{
                       modalHandler() 
                    }}
                    className={styles["nav-item"]+" active flex items-center gap-3 px-6 py-3 text-sm text-gray-300"} >
                    <i className="fas fa-plus-circle w-5 text-center text-green-400"></i>
                    <span>Agregar Película</span>
                </a>
                {openModal && <MovieModal modalHandler={modalHandler} movieInfo={{}}/>}


                <div className="px-4 mt-6 mb-2">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Gestión</span>
                </div>
                <a href="#" className="nav-item flex items-center gap-3 px-6 py-3 text-sm text-gray-300">
                    <i className="fas fa-tags w-5 text-center text-yellow-400"></i>
                    <span>Géneros</span>
                </a>
                <a href="#" className="nav-item flex items-center gap-3 px-6 py-3 text-sm text-gray-300">
                    <i className="fas fa-users w-5 text-center text-cyan-400"></i>
                    <span>Directores</span>
                </a>
                <a href="#" className="nav-item flex items-center gap-3 px-6 py-3 text-sm text-gray-300">
                    <i className="fas fa-cog w-5 text-center text-gray-400"></i>
                    <span>Configuración</span>
                </a>
            </nav>
            
            <div className="p-4 border-t border-white/5">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center">
                        <i className="fas fa-user text-sm"></i>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-white">Admin</p>
                        <p className="text-xs text-gray-400">admin@movies.com</p>
                    </div>
                </div>
            </div>
        </aside>
    
    )
}