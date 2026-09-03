package security

import (
	"fmt"
	"net/http"
	
	"strings"

	"github.com/gin-gonic/gin"
)


func AuthMiddleware()gin.HandlerFunc{
	return func(ctx *gin.Context) {

		
		fmt.Println("----------middleware--------")
		jwt := strings.ReplaceAll(ctx.Request.Header.Get("Authorization"), "Bearer ", "")
		verify, err := ValidateJWT(jwt)

		if jwt == "" {
			ctx.AbortWithStatusJSON(http.StatusUnauthorized, &MessageError{Ok: false, Message: "Token empty"})
			return
		}
		if err != nil{
			fmt.Println(err.Error())
			ctx.AbortWithStatusJSON(http.StatusUnauthorized, &MessageError{Ok: false, Message: "Invalid token"})
			return
		}
		ctx.Set("UserId", verify.Id)
		ctx.Set("UserEmail", verify.Email)
		ctx.Next()
		fmt.Println("--------pass-------")
		

	}
}





