package security

import (
	"fmt"
	"net/http"
	"strconv"
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
			ctx.AbortWithStatusJSON(http.StatusUnauthorized, &MessageError{Ok: false, Message: err.Error()})
			return
		}
		// if time.Now().Minute() > verify.ExpiresAt.Minute(){
		// 	ctx.AbortWithStatusJSON(http.StatusUnauthorized, &MessageError{Ok: false, Message: "Token expirated, please refresh token"})
		// 	return
		// }

		//fmt.Println(verify.Subject)
		userId, erro := strconv.ParseUint(verify.Subject, 10, 0) 
		if(erro != nil){
			ctx.AbortWithStatusJSON(http.StatusUnauthorized, &MessageError{Ok: false, Message: erro.Error()})
			return
		}
		ctx.Set("UserId", uint(userId))
		
		ctx.Next()
		fmt.Println("--------pass-------")
		

	}
}





