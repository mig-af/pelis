package services

import (
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


func (r *refreshTokenService) RefreshToken(token string)error{


	
	return nil
}







func (r *refreshTokenService) SaveRefreshToken(userId uint, refreshToken string)(string, error){
	var refreshTokenModel model.RefreshToken

	//--hashear refreshToken---
	hashToken := security.HashToken(refreshToken)

	refreshTokenModel = model.RefreshToken{
		UserId: userId,
		Token: hashToken,
		CreatedAt: time.Now(),
		ExpiresAt: time.Now().Add(15 * time.Minute),

	}

	resp := r.Repo.Save(&refreshTokenModel)
	if(resp != nil){
		return "", resp
	}
	return refreshToken, nil
}







