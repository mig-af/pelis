import { movies } from "./MoviesData"

export function GetByGenre(genre){
    let moviess = movies
    let jijo = [];
    
    moviess.forEach(v => {

        if(v.genre.includes(genre)){
            jijo.push(v);
        }
    })
    

    return jijo
}