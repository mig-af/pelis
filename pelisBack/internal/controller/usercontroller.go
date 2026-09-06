package controller

import (
	"net/http"
	"pelis/internal/domain/interfaces"
	
	"pelis/internal/domain/user"
	"pelis/internal/security"

	"github.com/gin-gonic/gin"
)





type UserController struct{
	
	Service interfaces.UserServiceInterface

}

func NewUserController(service interfaces.UserServiceInterface) *UserController{
	return &UserController{ Service: service}
}


// ---POST REGISTER---
func (u *UserController)Register(c *gin.Context){
	var userRegister user.UserRegister
	resp := c.BindJSON(&userRegister)
	if (resp != nil){
		c.IndentedJSON(http.StatusBadRequest, &security.MessageError{Ok: false, Message: "name, email, password required"})
		return
	}
	//---servicio registro "/register"
	erro := u.Service.Register(userRegister)
	if(erro != nil){
		c.IndentedJSON(http.StatusBadRequest, &security.MessageError{Ok: false, Message: erro.Error()})
		return
	}
	
	c.IndentedJSON(http.StatusCreated, gin.H{"Msg":"ok"})


}


//  "/login"
func (u *UserController) Login(c *gin.Context){
	var userLogin user.UserLogin
	
	resp := c.BindJSON(&userLogin)
	if(resp != nil){
		c.IndentedJSON(http.StatusForbidden, &security.MessageError{Ok: false, Message: resp.Error()})
		return
	}
	
	// --- servicio login
	userResponseDto, token, refreshToken, er := u.Service.Login(userLogin)
	if(er != nil){
		c.IndentedJSON(http.StatusBadRequest, &security.MessageError{Ok: false, Message: er.Error()})
		return
	}
	

	c.SetCookie(
		"refreshToken", refreshToken, 3600, "/", "/", true, true,
	)
	c.IndentedJSON(http.StatusAccepted, gin.H{"btoken":token, "data": userResponseDto})

}



