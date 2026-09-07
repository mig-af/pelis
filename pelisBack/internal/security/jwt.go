package security

import (
	"errors"
	"os"
	"strconv"
	"time"
	"github.com/golang-jwt/jwt/v5"
)



const JWT_DURATION time.Duration = 15 * time.Minute //minutos de duracion del jwttoken
var key_jwt  = []byte(os.Getenv("JWT_SECRET"))//pasar a env Variable 


type CustomClaim struct{
	jwt.RegisteredClaims
}


func GenerateJWT(id uint)(string, error){
	claims := &CustomClaim{
		RegisteredClaims: jwt.RegisteredClaims{
			Subject: strconv.FormatUint(uint64(id), 10),
			Issuer: "backend.pelis.com",
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(JWT_DURATION)),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokeString, err := token.SignedString(key_jwt)
	if( err != nil){
		return "", err
	}
	return tokeString, nil
}


func ValidateJWT(token string)(*CustomClaim, error){

	resp, err := jwt.ParseWithClaims(token, &CustomClaim{}, func(t *jwt.Token) (any, error) {
		return key_jwt, nil
	})
	if( err != nil ){
		return nil, err
	}
	claims, ok := resp.Claims.(*CustomClaim)
	if(resp.Valid && ok){
		return claims, nil
	}
	return nil, errors.New("No se pudo verificar el token")
	
}








