package model

import (
	"time"
	"gorm.io/gorm"
)






type RefreshToken struct{
	gorm.Model
	UserId uint 
	User User
	Token string 
	ExpiresAt time.Time
	CreatedAt time.Time
	Revoked bool `gorm:"default:false"`
}
