import axios from "axios"
//import { movies } from "../../data/MoviesData";
import { API_URL } from "../api";

// export function GetByGenre(genre){
//     let moviess = movies
//     let jijo = [];
    
//     moviess.forEach(v => {

//         if(v.genre.includes(genre)){
//             jijo.push(v);
//         }
//     })
    

//     return jijo
// }


export async function GetByGennre(genre){
    const url = `${API_URL}/api/movies/genre/${genre}`
    let resp = await axios.get(url)
    return resp
}