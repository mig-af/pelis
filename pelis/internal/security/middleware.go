package security

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)


func AuthMiddleware()gin.HandlerFunc{
	return func(ctx *gin.Context) {

		
		fmt.Println("----------a--------")
		fmt.Println(ctx.Request.Header.Get("Authorization"))
		ctx.IndentedJSON(http.StatusUnauthorized, gin.H{"Msg":"No"})
		ctx.Abort()

	}
}





