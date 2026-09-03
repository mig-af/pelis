package main

import (
	"fmt"
	"net/http"
	"pelis/internal/config"
	"pelis/internal/controller"
	"pelis/internal/domain/models"
	"pelis/internal/repository"
	"pelis/internal/services"
	"time"

	"gorm.io/gorm"
)

var DB *gorm.DB
func Init(){
	
	port := ":3006"
	DB = config.LoadDatabase()
	DB.AutoMigrate(&model.Movie{}, &model.User{}, &model.RefreshToken{})

	//--repository--
	repoMovie := repository.NewMovieRepository(DB)
	repoUser := repository.NewUserRepository(DB)
	repoRefreshToken := repository.NewRefreshTokenRepository(DB)

	//--services---
	serviceRefreshToken := services.NewRefreshTokenService(repoRefreshToken)
	

	//--controllers---
	ControllerMovie := controller.NewMovieController(repoMovie)
	controllerUser := controller.NewUserController(repoUser)
	controllerRefreshToken := controller.NewRefreshTokenController(serviceRefreshToken)

	

	router := config.LoadRouters(ControllerMovie, controllerUser, controllerRefreshToken)

	
	
	
	server := &http.Server{
		Addr: port,
		Handler: router,
		ReadHeaderTimeout: 2 * time.Second,
	}

	err := server.ListenAndServe()
	if( err != nil){
		fmt.Println(err)
		return
	}

	fmt.Println("Server iniciado")

	
}