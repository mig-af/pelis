import styles from "../style/Dashboard.module.css";

export function DashboardView(){
    return(
        
            <div id="dashboardView" className="p-8">
                {/* <!-- Dashboard View --> */}
                {/* <!-- Stats --> */}
                <h1>JIOJ DAHSBOARD VIEW</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className={styles["stat-card"]+" rounded-2xl p-6"}>
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                                <i className="fas fa-film text-indigo-400 text-xl"></i>
                            </div>
                            <span className="text-xs text-green-400 font-medium"><i className="fas fa-arrow-up mr-1"></i>12%</span>
                        </div>
                        <h3 className="text-3xl font-bold text-white" id="statTotal">0</h3>
                        <p className="text-sm text-gray-400 mt-1">Total Películas</p>
                    </div>
                    <div className={styles["stat-card"]+" rounded-2xl p-6"}>
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center">
                                <i className="fas fa-star text-yellow-400 text-xl"></i>
                            </div>
                            <span className="text-xs text-green-400 font-medium"><i className="fas fa-arrow-up mr-1"></i>5%</span>
                        </div>
                        <h3 className="text-3xl font-bold text-white" id="statAvgRating">0</h3>
                        <p className="text-sm text-gray-400 mt-1">Rating Promedio</p>
                    </div>
                    <div className={styles["stat-card"]+" rounded-2xl p-6"}>
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                                <i className="fas fa-tags text-purple-400 text-xl"></i>
                            </div>
                            <span className="text-xs text-blue-400 font-medium"><i className="fas fa-equals mr-1"></i></span>
                        </div>
                        <h3 className="text-3xl font-bold text-white" id="statGenres">0</h3>
                        <p className="text-sm text-gray-400 mt-1">Géneros Únicos</p>
                    </div>
                    <div className={styles["stat-card"]+" rounded-2xl p-6"}>
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                                <i className="fas fa-clock text-cyan-400 text-xl"></i>
                            </div>
                            <span className="text-xs text-green-400 font-medium"><i className="fas fa-arrow-up mr-1"></i>8%</span>
                        </div>
                        <h3 className="text-3xl font-bold text-white" id="statAvgDuration">0</h3>
                        <p className="text-sm text-gray-400 mt-1">Duración Promedio (min)</p>
                    </div>
                </div>

                {/* <!-- Recent Movies --> */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-white">Películas Recientes</h3>
                            <a href="#" 
                            // onclick="switchView('movies')" 
                            className="text-sm text-indigo-400 hover:text-indigo-300">Ver todas →</a>
                        </div>
                        <div id="recentMovies" className="space-y-3"></div>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Top Rated</h3>
                        <div id="topRated" className="space-y-3"></div>
                    </div>
                </div>
            </div>
    )
}