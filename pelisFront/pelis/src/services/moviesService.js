import axios from "axios";
import { MOVIES_ENDPOINT } from "./api";


const api = axios.create({
    baseURL: MOVIES_ENDPOINT,
    })
api.interceptors.request.use(config =>{
    const token = localStorage.getItem("bearer");
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
})

export async function postAddMovie(movie){
    // const bearer = localStorage.getItem("bearer");
    // const config = {
    //     headers: {
    //         Authorization:`Bearer ${bearer}`
    //     }
    // }

    const data = {
        
        title: movie.title,
        year: movie.year,
        duration: movie.duration,
        rating: movie.rating,
        genre: movie.genre,
        description: movie.description,
        director: movie.director,
        cast: movie.cast,
        image: movie.image,
        category: movie.category,
        movie_url: movie.movie_url
    }

    const resp = await api.post("", data);
    if(resp.status == 201){
        console.log("--------pelicula creada-----")
        console.log(resp.status)
        //console.log(resp.data);
        return {status:true, data:resp.data}
    }
    console.log(resp.data);
    return {status:false, data:resp.data}

}

export async function getItems(){
    // const bearer = localStorage.getItem("bearer");
    // const config = {
    //     headers: {
    //         Authorization:`Bearer ${bearer}`
    //         }
    //     }

    const resp = await api.get();
    if(resp.status == 200){
        return {status:true, data:resp.data};
    }
    return {status:false, data:resp.data};
    
}


export async function deleteItem(id){
    const resp = await api.delete(`/${id}`);
    if(resp.status == 204){
        return {status: true}
    }
    return false
}

export async function updateItem(movie){
    const data = {
        id: movie.id,
        title: movie.title,
        year: movie.year,
        duration: movie.duration,
        rating: movie.rating,
        genre: movie.genre,
        description: movie.description,
        director: movie.director,
        cast: movie.cast,
        image: movie.image,
        category: movie.category,
        movie_url: movie.movie_url
    }

   const resp = await api.put("", data);
   if(resp.status == 200){
        return {status:true, data:resp.data};
   }
   return {status:false, data:resp.data};

}


