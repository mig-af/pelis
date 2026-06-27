package repository

import (
	model "pelis/internal/domain/models"

	"gorm.io/gorm"
)



type UserRepository struct{

	Db *gorm.DB

}


func (u *UserRepository) Save(User *model.User)error{
	resp := u.Db.Create(User)
	if(resp.Error != nil){
		return resp.Error
	}
	return nil
}

func (u *UserRepository) FindByEmail(email string)(*model.User, error){
	var user model.User
	resp := u.Db.Where("email = ?", email).First(&user)
	if( resp.Error != nil){
		return nil, resp.Error
	}
	return &user, nil
}