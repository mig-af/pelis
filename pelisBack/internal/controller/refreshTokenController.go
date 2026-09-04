package controller

import (
	"pelis/internal/domain/interfaces"
)





type RefreshTokenController struct{
	Service interfaces.RefreshTokenServiceInterface
}

func NewRefreshTokenController(service interfaces.RefreshTokenServiceInterface) *RefreshTokenController{
	return &RefreshTokenController{Service: service}
}










