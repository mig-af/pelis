package security

import (
	"errors"
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


func ValidateJWT(token string)(*CustomClaim, error){

	resp, err := jwt.ParseWithClaims(token, &CustomClaim{}, func(t *jwt.Token) (any, error) {
		return pruebitaKeysito, nil
	})
	if( err != nil){
		return nil, err
	}
	claims, ok := resp.Claims.(*CustomClaim)
	if(resp.Valid && ok){
		return claims, nil
	}
	return nil, errors.New("No se pudo verificar el token")
	
}








