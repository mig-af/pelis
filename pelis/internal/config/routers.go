package config

import (
	"pelis/internal/controler"
	"pelis/internal/security"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func LoadRouters(controllerMovie *controler.MovieController, controllerUser *controler.UserController)(*gin.Engine ){

	routers := gin.Default() 

	
	routers.POST("/register", controllerUser.Register)
	routers.POST("/login", controllerUser.Login)

	api := routers.Group("/api")
	api.Use(cors.New(cors.Config{
		//AllowOrigins:     []string{"https://cuddly-space-carnival-r4rv66r695rg2x7jp-5173.app.github.dev/"},
		AllowOriginFunc: func(origin string)bool{return true} ,
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		AllowCredentials: true,
	}))//solo para prueba 
	//api.Use(security.AuthMiddleware())
	{
		api.GET("/movies/:id", controllerMovie.GetById)
		api.GET("/movies/genre/:genre", controllerMovie.GetByGenre)
		api.GET("/movies",security.AuthMiddleware(), controllerMovie.GetAllMovies)
		api.POST("/movies",security.AuthMiddleware(), controllerMovie.InsertMovie)
		api.DELETE("/movies/:id",security.AuthMiddleware(), controllerMovie.DeleteById)
		api.PUT("/movies",security.AuthMiddleware(), controllerMovie.UpdateMovie)
		
		
	}
	
	return routers
}