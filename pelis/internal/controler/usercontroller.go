package controler

import (
	"net/http"
	model "pelis/internal/domain/models"
	"pelis/internal/domain/user"
	"pelis/internal/repository"
	"pelis/internal/security"
	"github.com/gin-gonic/gin"
)





type UserController struct{
	Repo repository.UserRepository
}


// ---POST REGISTER---
func (u *UserController)Register(c *gin.Context){
	var userRegister user.UserRegister
	resp := c.BindJSON(&userRegister)
	if (resp != nil){
		c.IndentedJSON(http.StatusBadRequest, gin.H{"Msg":resp.Error()})
		return
	}

	//No hay validaciones, anadir si es posible
	pass, erro := security.HashPass(userRegister.Password)
	if(erro != nil){
		c.IndentedJSON(http.StatusBadRequest, gin.H{"Msg":erro.Error()})
		return
	}

	newUser := &model.User{Name: userRegister.Name, Email: userRegister.Email, Password: pass}
	err := u.Repo.Save(newUser)
	if( err != nil){
		c.IndentedJSON(http.StatusBadRequest, gin.H{"Msg":err.Error()})
		return
	}
	c.IndentedJSON(http.StatusCreated, gin.H{"Msg":"ok"})


}

func (u *UserController) Login(c *gin.Context){
	var userLogin user.UserLogin
	resp := c.BindJSON(&userLogin)
	if(resp != nil){
		c.IndentedJSON(http.StatusForbidden, gin.H{"Msg":resp.Error()})
		return
	}
	user, err := u.Repo.FindByEmail(userLogin.Email)
	if( err != nil){
		c.IndentedJSON(http.StatusNotFound, gin.H{"Msg":"usuario no encotrado"})
		return
	}
	compare := security.CheckHash(user.Password, userLogin.Password)
	if(!compare){
		c.IndentedJSON(http.StatusUnauthorized, gin.H{"Msg":"Password incorrecto"})
		return
	}
	token, erro := security.GenerateJWT(user.ID, user.Email)
	if(erro != nil){
		c.IndentedJSON(http.StatusConflict, gin.H{"Msg":erro.Error()})
		return 
	}

	c.IndentedJSON(http.StatusAccepted, gin.H{"Msg":"jijo pasaste mano", "token":token})

}



