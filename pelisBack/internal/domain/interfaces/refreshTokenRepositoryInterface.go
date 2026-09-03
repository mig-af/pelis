package interfaces

import model "pelis/internal/domain/models"


type RefreshTokenRepositoryInterface interface{

	GetRefreshToken(hashToken string)(*model.RefreshToken, error)
	Save(refreshTokenModel *model.RefreshToken)error
	UpdateRefresToken(id uint, refreshTokenModel *model.RefreshToken)error

}