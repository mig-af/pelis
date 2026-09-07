package controller

import (
	"fmt"
	"net/http"

	"pelis/internal/domain/interfaces"
	"pelis/internal/security"

	"github.com/gin-gonic/gin"
)





type RefreshTokenController struct{
	Service interfaces.RefreshTokenServiceInterface
}

func NewRefreshTokenController(service interfaces.RefreshTokenServiceInterface) *RefreshTokenController{
	return &RefreshTokenController{Service: service}
}





func (r *RefreshTokenController)GetRefreshToken(c *gin.Context){
	fmt.Println("-----------", c.Request.Method, "-----------------")
	token, err := c.Cookie("refreshToken")
	if(err != nil){
		c.IndentedJSON(http.StatusUnauthorized, &security.MessageError{Ok: false, Message: "Unauthorized"})
		return  
	}

	//fmt.Println(token)
	jwt, refreshToken, erro := r.Service.RefreshToken(token)
	if(erro != nil){

		return
	}
	fmt.Println(jwt, refreshToken)
}








