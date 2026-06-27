package security

import (
	"time"

	"github.com/golang-jwt/jwt/v5"
)




type CustomClaim struct{
	Id uint `json:"id"`
	Email string `json:"email"`
	jwt.RegisteredClaims
}

var pruebitaKeysito  = []byte("manchoso")//pasar a env Variable despues

func GenerateJWT(id uint, email string)(string, error){
	claims := &CustomClaim{
		Id: id,
		Email: email,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(24 * time.Hour)),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokeString, err := token.SignedString(pruebitaKeysito)
	if( err != nil){
		return "", err
	}
	return tokeString, nil
}








