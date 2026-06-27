package controler

import (
	"fmt"
	"net/http"
	"pelis/internal/domain/models"
	"pelis/internal/domain/movie"
	"pelis/internal/repository"
	"pelis/internal/security"
	"strconv"

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
	idMovie := c.Param("id")
	idd, _ := strconv.Atoi(idMovie)
	userId, ok := c.Get("UserId")
	if(!ok){
		c.IndentedJSON(http.StatusUnauthorized, &security.MessageError{Ok: false, Message: "Not authorized"})
		return	
	}
	Movie, err := m.Repo.GetById(userId.(uint) ,uint(idd))
	if(err != nil){
		c.IndentedJSON(http.StatusNotFound, &security.MessageError{Ok: false, Message: err.Error()})
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



//--------------------GET ALL ITEMS
func (m *MovieController) GetAllMovies(c *gin.Context){
	userId, ok := c.Get("UserId")
	if(!ok){
		c.IndentedJSON(http.StatusUnauthorized, &security.MessageError{Ok: false, Message: "Not authorized"})
		return	
	}

	movies, err := m.Repo.GetAllMovies(userId.(uint))
	if(err != nil){
		c.IndentedJSON(http.StatusNotFound, &security.MessageError{Ok: false, Message: err.Error()})
		return
	}
	var MoviesResponse []*movie.MovieResponse
	for _, v := range movies{
		MoviesResponse = append(MoviesResponse, &movie.MovieResponse{
			Id: v.ID,Name: v.Name, MovieUrl: v.MovieUrl, PosterUrl: v.PosterUrl,
			Duration: v.Duration, Sinopsis: v.Sinopsis, Genre: v.Genre,
			
		})
	}
	//fmt.Println(movies)
	c.IndentedJSON(http.StatusOK, &MoviesResponse)
}


//------------------POST INSERT MOVIE
func (m *MovieController)InsertMovie(c *gin.Context){
	userID, _ := c.Get("UserId")
	var MoviePost movie.MoviePost


	data := c.BindJSON(&MoviePost)
	if(data != nil){
		fmt.Println(data)
		c.IndentedJSON(http.StatusNotFound, &security.MessageError{Ok: false, Message: data.Error()})
		return
	}
	
	Movie := &model.Movie{Name: MoviePost.Name, MovieUrl: MoviePost.MovieUrl, UserID: userID.(uint)}
	err := m.Repo.Save(Movie)
	if (err != nil){
		c.IndentedJSON(http.StatusNotFound, &security.MessageError{Ok: false, Message: err.Error()})
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
	userId, ok := c.Get("UserId")
	if(!ok){
		c.IndentedJSON(http.StatusUnauthorized, &security.MessageError{Ok: false, Message: "Not authorized"})
		return	
	}

	resp := m.Repo.DeleteById(userId.(uint), uint(idd))
	if(resp != nil){
		c.IndentedJSON(http.StatusNotFound, &security.MessageError{Ok: false, Message: resp.Error()})
		return
	}
	c.IndentedJSON(http.StatusNoContent, &obj{Message: "Ok"})

}

//-------PUT----
func (m *MovieController) UpdateMovie(c *gin.Context){
	var movieUpdate *movie.MovieUpdate

	userId, ok := c.Get("UserId")
	if(!ok){
		c.IndentedJSON(http.StatusUnauthorized, &security.MessageError{Ok: false, Message: "Not authorized"})
		return	
	}


	body := c.BindJSON(&movieUpdate)
	if(body != nil){
		c.IndentedJSON(http.StatusBadRequest, &security.MessageError{Ok: false, Message: body.Error()})
		return
	}

	Movie, err := m.Repo.GetById(userId.(uint), movieUpdate.Id)
	if(err != nil){
		c.IndentedJSON(http.StatusNotFound, &security.MessageError{Ok: false, Message: err.Error()})
		return
	}
	Movie.Update(movieUpdate)
	erro := m.Repo.Update(movieUpdate.Id, &Movie)
	if( erro != nil){
		fmt.Println("------\n"+erro.Error())
		c.IndentedJSON(http.StatusNotModified, &security.MessageError{Ok: false, Message: erro.Error()})
		return
	}
	//fmt.Println(Movie)
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









