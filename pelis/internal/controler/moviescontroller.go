package controler

import (
	"fmt"
	"net/http"
	"strconv"
	"pelis/internal/repository"
	"pelis/internal/domain/models"
	"pelis/internal/domain/movie"
	"github.com/gin-gonic/gin"
)





type MovieController struct{
	Repo repository.MovieRepository
}

type obj struct{
	Message string
}

//GET BY ID
func (m *MovieController) GetById(c *gin.Context){
	id := c.Param("id")
	idd, _ := strconv.Atoi(id)
	Movie, err := m.Repo.GetById(uint(idd))
	if(err != nil){
		c.IndentedJSON(http.StatusNotFound, &obj{Message: "No existe"})
		return
	}
	RespMovie := &movie.MovieResponse{
		Id: Movie.GetId(),
		Name: Movie.GetName(),
		MovieUrl: Movie.GetMovieUrl(),
		PosterUrl: Movie.GetPosterUrl(),
		Duration: Movie.GetDuration(),
		Sinopsis: Movie.GetSinopsis(),
		Genre: Movie.GetGenre(),
	}
	c.IndentedJSON(http.StatusOK, &RespMovie)
}



//GET ALL ITEMS
func (m *MovieController) GetAllMovies(c *gin.Context){
	movies, err := m.Repo.GetAllMovies()
	if(err != nil){
		c.IndentedJSON(http.StatusNotFound, &obj{Message: "No existe papu"})
	}
	var Movies []*movie.MovieResponse
	for _, v := range movies{
		Movies = append(Movies, &movie.MovieResponse{
			Id: v.ID,Name: v.Name, MovieUrl: v.MovieUrl, PosterUrl: v.PosterUrl,
			Duration: v.Duration, Sinopsis: v.Sinopsis, Genre: v.Genre,
			
		})
	}
	//fmt.Println(movies)
	c.IndentedJSON(http.StatusOK, &Movies)
}

//POST INSERT MOVIE
func (m *MovieController)InsertMovie(c *gin.Context){
	
	var MoviePost movie.MoviePost
	data := c.BindJSON(&MoviePost)
	if(data != nil){
		fmt.Println(data)
		c.IndentedJSON(http.StatusNotFound, &obj{Message: "Error jijo"})
		return
	}

	Movie := &model.Movie{Name: MoviePost.Name, MovieUrl: MoviePost.MovieUrl}
	err := m.Repo.Save(Movie)
	if (err != nil){
		c.IndentedJSON(http.StatusNotFound, &obj{Message: "Error jijo"})
		return
	}
	moviResponse := &movie.MovieResponse{
		Id: Movie.ID, Name: Movie.Name, MovieUrl: Movie.MovieUrl,
		PosterUrl: Movie.PosterUrl, Duration: Movie.Duration, Sinopsis: Movie.Duration,
		Genre: Movie.Genre,
		}
	c.IndentedJSON(http.StatusCreated, &moviResponse)
	
}



// DELETE 

func (m *MovieController)DeleteById(c *gin.Context){
	id := c.Param("id")
	idd, _ := strconv.Atoi(id)
	resp := m.Repo.DeleteById(uint(idd))
	if(resp != nil){
		c.IndentedJSON(http.StatusNotFound, &obj{Message: "Not found"})
		return
	}
	c.IndentedJSON(http.StatusNoContent, &obj{Message: "Ok"})

}


func (m *MovieController) UpdateMovie(c *gin.Context){
	var movieUpdate *movie.MovieUpdate

	body := c.BindJSON(&movieUpdate)
	if(body != nil){
		c.IndentedJSON(http.StatusBadRequest, &obj{Message: "Error json"})
		return
	}

	Movie, err := m.Repo.GetById(movieUpdate.Id)
	if(err != nil){
		c.IndentedJSON(http.StatusNotFound, &obj{Message: "No hay una pelicula con tal id"})
		return
	}

	erro := m.Repo.Update(movieUpdate.Id, &Movie)
	if( erro != nil){
		fmt.Println("------\n"+erro.Error())
		c.IndentedJSON(http.StatusNotModified, &obj{Message: "error "+erro.Error()})
		return
	}
	fmt.Println(Movie)
	RespMovie := &movie.MovieResponse{
		
		Id: Movie.GetId(),
		Name: Movie.GetName(),
		MovieUrl: Movie.GetMovieUrl(),
		PosterUrl: Movie.GetPosterUrl(),
		Duration: Movie.GetDuration(),
		Sinopsis: Movie.GetSinopsis(),
		Genre: Movie.GetGenre(),
		
	}

	c.IndentedJSON(http.StatusOK, &RespMovie)

}








// //get Movies by id 
// func (m *MovieController) GetMoviesById(c *gin.Context){
// 	id, _:= strconv.Atoi(c.Param("id"))

// 	for _, v := range(movies){
// 		if( id == v.Id){
// 			c.IndentedJSON(http.StatusOK, v)
// 			return
// 		}
// 	}
	
// }









