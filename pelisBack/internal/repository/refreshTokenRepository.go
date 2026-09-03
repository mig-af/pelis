package repository

import (
	
	"pelis/internal/domain/interfaces"
	model "pelis/internal/domain/models"

	"gorm.io/gorm"
)


type refreshTokenRepository struct{

	Db *gorm.DB

}

func NewRefreshTokenRepository(db *gorm.DB)interfaces.RefreshTokenRepositoryInterface{
	return &refreshTokenRepository{Db: db}
}


func(r *refreshTokenRepository)GetRefreshToken(hashToken string)(*model.RefreshToken, error){
	var refreshTokenModel model.RefreshToken
	resp := r.Db.Where("token = ?", hashToken).Find(&refreshTokenModel)
	if(resp.Error != nil){
		return &model.RefreshToken{}, resp.Error
	}

	return &refreshTokenModel, nil
}


func (r *refreshTokenRepository) Save(refreshTokenModel *model.RefreshToken)error{
	resp := r.Db.Create(refreshTokenModel)
	if(resp.Error != nil){
		return resp.Error
	}
	return nil
}
func (r *refreshTokenRepository)UpdateRefresToken(id uint, refreshTokenModel *model.RefreshToken)error{
	resp := r.Db.Where("id = ?", id).Updates(&refreshTokenModel)
	if(resp.Error != nil){
		return resp.Error
	}
	return nil
}
