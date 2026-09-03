import { Sidebar } from "./Sidebar"
import { MainContent } from "./MainContent";
import { useState } from "react";
import { DashboardView } from "./components/DashboardView";
import { MoviesView } from "./components/MoviesView";
import { MovieModal } from "./components/MovieModal";

export function Dashboard(){
    
    const [view, setView] = useState(<DashboardView />);

    const views = [
        { id: "dashboardView", element: <DashboardView /> },
        { id: "moviesView", element: <MoviesView />},
        { id: "movieModal", element: <MovieModal />}
    ]

    const setMainView = (viewId) => {
        
        views.forEach(v =>{
            if(v.id == viewId){
                setView(v.element)
            }
        })
        console.log(view)
    }
    
    return (
        <div className="text-white min-h-screen">
            <div id="app" className="flex min-h-screen">
                <Sidebar setMainView={setMainView} />
                <MainContent view={view}/>
            </div>
            
            
        </div>
    )
}