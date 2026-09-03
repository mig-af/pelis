package interfaces

import model "pelis/internal/domain/models"



type UserRepositoryInterface interface{


	Save(*model.User)error
	FindByEmail(email string)(*model.User, error)

}