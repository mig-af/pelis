package config

import (
	"pelis/internal/controler"

	"github.com/gin-gonic/gin"
)

func LoadRouters(controllerMovie *controler.MovieController, controllerUser *controler.UserController)(*gin.Engine ){

	routers := gin.Default() 

	
	routers.POST("/register", controllerUser.Register)
	routers.POST("/login", controllerUser.Login)

	api := routers.Group("/api")
	api.GET("/movies", controllerMovie.GetAllMovies)
	api.GET("/movies/:id", controllerMovie.GetById)
	api.POST("/movies", controllerMovie.InsertMovie)
	api.DELETE("/movies/:id", controllerMovie.DeleteById)
	api.PUT("/movies", controllerMovie.UpdateMovie)
	
	return routers
}