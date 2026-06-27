package main

import (
	"fmt"
	"net/http"
	"pelis/internal/config"
	"pelis/internal/controler"
	"pelis/internal/repository"
	"pelis/internal/domain/models"
	"time"

	"gorm.io/gorm"
)

var DB *gorm.DB
func Init(){
	
	port := ":3006"
	DB = config.LoadDatabase()
	DB.AutoMigrate(&model.Movie{}, &model.User{})

	RepoMovie := &repository.MovieRepository{Db: DB}
	ControllerMovie := &controler.MovieController{Repo: *RepoMovie}
	RepoUser := &repository.UserRepository{Db: DB}
	ControllerUser := &controler.UserController{Repo: *RepoUser}

	router := config.LoadRouters(ControllerMovie, ControllerUser)

	
	
	
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