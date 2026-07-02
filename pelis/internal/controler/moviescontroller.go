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
		Title: Movie.GetTitle(),
		Year: Movie.GetYear(),
		MovieUrl: Movie.GetMovieUrl(),
		Image: Movie.GetImage(),
		Duration: Movie.GetDuration(),
		Description: Movie.GetDescription(),
		Director: Movie.GetDirector(),
		Cast: Movie.GetCast(),
		Genre: Movie.GetGenre(),
		Rating: Movie.GetRating(),
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
			Id: v.GetId(),
			Title: v.GetTitle(),
			Year: v.GetYear(),
			MovieUrl: v.GetMovieUrl(),
			Image: v.GetImage(),
			Duration: v.GetDuration(),
			Description: v.GetDescription(),
			Director: v.GetDirector(),
			Cast: v.GetCast(),
			Genre: v.GetGenre(),
			Rating: v.GetRating(),
			
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
	
	Movie := &model.Movie{
		Title: MoviePost.Title,
		Year: MoviePost.Year, 
		MovieUrl: MoviePost.MovieUrl, 
		Image: MoviePost.Image,
		Duration: MoviePost.Duration,
		Description: MoviePost.Description,
		Director: MoviePost.Director,
		Cast: MoviePost.Cast,
		Genre: MoviePost.Genre,
		Rating: MoviePost.Rating,
		UserID: userID.(uint),
	}
	//SAVE
	err := m.Repo.Save(Movie)

	if (err != nil){
		c.IndentedJSON(http.StatusNotFound, &security.MessageError{Ok: false, Message: err.Error()})
		return
	}
	moviResponse := &movie.MovieResponse{
		Id: Movie.GetId(),
		Title: Movie.GetTitle(),
		Year: Movie.GetYear(),
		MovieUrl: Movie.GetMovieUrl(),
		Image: Movie.GetImage(),
		Duration: Movie.GetDuration(),
		Description: Movie.GetDescription(),
		Director: Movie.GetDirector(),
		Cast: Movie.GetCast(),
		Genre: Movie.GetGenre(),
		Rating: Movie.GetRating(),
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
		Title: Movie.GetTitle(),
		Year: Movie.GetYear(),
		MovieUrl: Movie.GetMovieUrl(),
		Image: Movie.GetImage(),
		Duration: Movie.GetDuration(),
		Description: Movie.GetDescription(),
		Director: Movie.GetDirector(),
		Cast: Movie.GetCast(),
		Genre: Movie.GetGenre(),
		Rating: Movie.GetRating(),
		
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









