package interfaces



type RefreshTokenServiceInterface interface{
	SaveRefreshToken(userId uint, refreshToken string)(string, error)
	RefreshToken(userId uint, token string)error
}