package services

import (
	"errors"
	"pelis/internal/domain/interfaces"
	model "pelis/internal/domain/models"
	"pelis/internal/security"
	"time"
)




type refreshTokenService struct{
	Repo interfaces.RefreshTokenRepositoryInterface
}

func NewRefreshTokenService(repo interfaces.RefreshTokenRepositoryInterface)interfaces.RefreshTokenServiceInterface{
	return &refreshTokenService{Repo: repo}
}


func (r *refreshTokenService) RefreshToken(token string)(string, string, error){

	hash := security.HashRefreshToken(token)

	resp, err := r.Repo.GetRefreshToken(hash)
	if( err != nil ){
		return "", "", err
	}
	if( resp.Revoked ){
		return  "", "", errors.New("refresh token revoked")
	}
	if( time.Now().Hour() > resp.ExpiresAt.Hour() ){
		return "", "", errors.New("Refresh token expired, please login")
	}

	//----generate jwt----
	jwt, erro := security.GenerateJWT(resp.UserId)
	if(erro != nil){
		return "", "", erro
	}


	//-----Save newRefreshtoken---
	refreshToken := security.GenerateRefreshToken()
	refreshT, er := r.SaveRefreshToken(resp.UserId, refreshToken)
	if(er != nil){
		return "", "", er
	}

	//---update last refreshtoken revoked=true
	resp.Revoked=true
	update := r.Repo.UpdateRefresToken(resp.Token, resp)
	if(update != nil){
		return "", "", update
	}

	return jwt, refreshT, nil
}







func (r *refreshTokenService) SaveRefreshToken(userId uint, refreshToken string)(string, error){
	var refreshTokenModel model.RefreshToken

	//--hashear refreshToken---
	hashToken := security.HashRefreshToken(refreshToken)

	refreshTokenModel = model.RefreshToken{
		UserId: userId,
		Token: hashToken,
		CreatedAt: time.Now(),
		ExpiresAt: time.Now().Add(168 * time.Hour),

	}

	resp := r.Repo.Save(&refreshTokenModel)
	if(resp != nil){
		return "", resp
	}
	return refreshToken, nil
}






