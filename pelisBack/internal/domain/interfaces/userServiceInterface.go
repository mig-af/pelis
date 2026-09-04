package interfaces

import (
	
	"pelis/internal/domain/user"
)


type UserServiceInterface interface{

	Login(userLoginDTO user.UserLogin) (*user.UserResponse,string, string, error)
	Register (userRegisterDTO user.UserRegister) error
	
}
