package config

import (
	"pelis/internal/controller"
	"pelis/internal/security"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func LoadRouters(
	controllerMovie *controller.MovieController, 
	controllerUser *controller.UserController,
	controllerRefreshToken *controller.RefreshTokenController,
	)(*gin.Engine ){


	
	routers := gin.Default() 

	routers.Use(cors.New(cors.Config{
		AllowOriginFunc: func(origin string)bool{return true} ,//solo para pruebas
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		AllowCredentials: true,
	}))

	routers.GET("/refresh", controllerRefreshToken.GetRefreshToken)

	routers.POST("/register", controllerUser.Register)
	routers.POST("/login", controllerUser.Login)
	
	api := routers.Group("/api")
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