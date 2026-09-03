package controller

import (
	"net/http"
	"pelis/internal/domain/interfaces"
	model "pelis/internal/domain/models"
	"pelis/internal/domain/user"
	"pelis/internal/security"

	"github.com/gin-gonic/gin"
)





type UserController struct{
	Repo interfaces.UserRepositoryInterface
	
}

func NewUserController(repo interfaces.UserRepositoryInterface) *UserController{
	return &UserController{Repo: repo}
}


// ---POST REGISTER---
func (u *UserController)Register(c *gin.Context){
	var userRegister user.UserRegister
	resp := c.BindJSON(&userRegister)
	if (resp != nil){
		c.IndentedJSON(http.StatusBadRequest, &security.MessageError{Ok: false, Message: "name, email, password required"})
		return
	}

	//No hay validaciones, anadir si es posible
	pass, erro := security.HashPass(userRegister.Password)
	if(erro != nil){
		c.IndentedJSON(http.StatusBadRequest, &security.MessageError{Ok: false, Message: erro.Error()})
		return
	}

	newUser := &model.User{Name: userRegister.Name, Email: userRegister.Email, Password: pass}
	err := u.Repo.Save(newUser)
	if( err != nil){
		c.IndentedJSON(http.StatusBadRequest, &security.MessageError{Ok: false, Message: err.Error()})
		return
	}
	c.IndentedJSON(http.StatusCreated, gin.H{"Msg":"ok"})


}

func (u *UserController) Login(c *gin.Context){
	var userLogin user.UserLogin
	
	resp := c.BindJSON(&userLogin)
	if(resp != nil){
		c.IndentedJSON(http.StatusForbidden, &security.MessageError{Ok: false, Message: resp.Error()})
		return
	}
	userr, err := u.Repo.FindByEmail(userLogin.Email)
	if( err != nil){
		c.IndentedJSON(http.StatusNotFound, &security.MessageError{Ok: false, Message: "User not found"})
		return
	}
	compare := security.CheckHash(userr.Password, userLogin.Password)
	if(!compare){
		c.IndentedJSON(http.StatusUnauthorized, &security.MessageError{Ok: false, Message: "Password fail"})
		return
	}
	token, erro := security.GenerateJWT(userr.ID, userr.Email)
	if(erro != nil){
		c.IndentedJSON(http.StatusConflict, &security.MessageError{Ok: false, Message: erro.Error()})
		return 
	}



	c.SetCookie(
		"token", token, 3600, "/", "/", true, true,
	)
	c.IndentedJSON(http.StatusAccepted, gin.H{"btoken":token,"user":&user.UserResponse{Name: userr.Name, Email: userr.Email}})

}



