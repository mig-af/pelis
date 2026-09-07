package services

import (
	"errors"
	"pelis/internal/domain/interfaces"
	model "pelis/internal/domain/models"

	"pelis/internal/domain/user"
	"pelis/internal/security"
)


type userService struct{
	Repo interfaces.UserRepositoryInterface
	RefreshTService interfaces.RefreshTokenServiceInterface
}

func NewUserService(repo interfaces.UserRepositoryInterface, rtokenService interfaces.RefreshTokenServiceInterface)interfaces.UserServiceInterface{
	return &userService{Repo: repo, RefreshTService: rtokenService}
}


func (u *userService)Register(userRegisterDTO user.UserRegister)error{

	//No hay validaciones, anadir si es posible
	pass, erro := security.HashPass(userRegisterDTO.Password)
	if(erro != nil){
		//c.IndentedJSON(http.StatusBadRequest, &security.MessageError{Ok: false, Message: erro.Error()})
		return erro
	}
	
	_, er := u.Repo.FindByEmail(userRegisterDTO.Email)
	if( er == nil ){
		return errors.New("Email already exist")
	}

	newUser := &model.User{Name: userRegisterDTO.Name, Email: userRegisterDTO.Email, Password: pass}
	err := u.Repo.Save(newUser)
	if( err != nil){
		//c.IndentedJSON(http.StatusBadRequest, &security.MessageError{Ok: false, Message: err.Error()})
		return err
	}
	return nil
}



func (u *userService)Login(userLoginDTO user.UserLogin)(*user.UserResponse, string, string,  error){
	userr, err := u.Repo.FindByEmail(userLoginDTO.Email)
	if( err != nil){
		//c.IndentedJSON(http.StatusNotFound, &security.MessageError{Ok: false, Message: "User not found"})
		return nil, "", "", errors.New("user not found")
	}
	
	compare := security.CheckHash(userr.Password, userLoginDTO.Password)
	if(!compare){
		//c.IndentedJSON(http.StatusUnauthorized, &security.MessageError{Ok: false, Message: "Password fail"})
		return nil,"","", errors.New("passowrd incorrect")
	}
	tokenJWT, erro := security.GenerateJWT(userr.ID)
	if(erro != nil){
		//c.IndentedJSON(http.StatusConflict, &security.MessageError{Ok: false, Message: erro.Error()})
		return nil,"", "", erro
	}


	refreshTokenGenerated := security.GenerateRefreshToken()
	refreshTokenValid, err := u.RefreshTService.SaveRefreshToken(userr.ID, refreshTokenGenerated)
	if(err != nil){
		return nil, "","", err
	}


	return &user.UserResponse{Name: userr.Name, Email: userr.Email}, tokenJWT, refreshTokenValid, nil
}


