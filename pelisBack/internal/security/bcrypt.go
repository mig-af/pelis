package security

import "golang.org/x/crypto/bcrypt"





func HashPass(passw string)(string, error){
	crypt, err := bcrypt.GenerateFromPassword([]byte(passw), bcrypt.DefaultCost)
	if( err != nil ){
		return "", err
	}
	return string(crypt), nil
}	

func CheckHash(hash string, pass string)bool{
	resp := bcrypt.CompareHashAndPassword([]byte(hash), []byte(pass))
	return resp == nil
}



