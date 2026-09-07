package interfaces



type RefreshTokenServiceInterface interface{
	SaveRefreshToken(userId uint, refreshToken string)(string, error)
	RefreshToken(token string)(string, string, error)
}