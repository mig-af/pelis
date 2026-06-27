package config

import (
	"log"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)





func LoadDatabase()*gorm.DB{
	//postgresql://neondb_owner:npg_xpfV8LnXQeE2@ep-summer-voice-aiyumcnp.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require
	//dsn := "host=localhost user=mikis password=mikis123 dbname=pelisdb port=5432 sslmode=disable"
	dsn := os.Getenv("URL_DB")
	DB, err := gorm.Open(postgres.Open(dsn), nil)
	if(err != nil){
		panic(err)
	}
	log.Println("Connection success")
	return DB

}


