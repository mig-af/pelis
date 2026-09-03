package services

import "pelis/internal/domain/interfaces"


type userService struct{
	Repo interfaces.UserRepositoryInterface
	RefreshService interfaces.RefreshTokenServiceInterface
}

func NewUserService(){

}


