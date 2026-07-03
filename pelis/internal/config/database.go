package config

import (
	"log"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)





func LoadDatabase()*gorm.DB{
	
	//dsnExample := "host=localhost user= password= dbname= port=5432 sslmode=disable"
	dsn := os.Getenv("URL_DB")
	DB, err := gorm.Open(postgres.Open(dsn), nil)
	if(err != nil){
		panic(err)
	}
	log.Println("Connection success")
	return DB

}


