package interfaces

import model "pelis/internal/domain/models"


type RefreshTokenRepositoryInterface interface{

	GetRefreshToken(hashToken string)(*model.RefreshToken, error)
	Save(refreshTokenModel *model.RefreshToken)error
	UpdateRefresToken(hashToken string, refreshTokenModel *model.RefreshToken)error

}