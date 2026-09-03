package repository

import (
	"pelis/internal/domain/interfaces"
	model "pelis/internal/domain/models"

	"gorm.io/gorm"
)



type userRepository struct{

	Db *gorm.DB

}

func NewUserRepository(db *gorm.DB)interfaces.UserRepositoryInterface{
	return &userRepository{Db: db}
}

func (u *userRepository) Save(User *model.User)error{
	resp := u.Db.Create(User)
	if(resp.Error != nil){
		return resp.Error
	}
	return nil
}

func (u *userRepository) FindByEmail(email string)(*model.User, error){
	var user model.User
	resp := u.Db.Where("email = ?", email).First(&user)
	if( resp.Error != nil){
		return nil, resp.Error
	}
	return &user, nil
}