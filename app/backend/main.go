package main

import (
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/miniminh/AIELTS/tree/main/app/backend/database"
	"os"
	"log"
)

func init() {
	err := godotenv.Load(".env.local")
	if err != nil {
		log.Fatal("No setting in .env.local found!")
	}
 
	mode := os.Getenv("GIN_MODE")
	if mode == "release" {
	   	err = godotenv.Load()
	   	if err != nil {
			log.Fatal("No setting in .env found in Release mode!")
	   	}
	}
}

func main() {
	router := gin.Default()
	database.Connect()
	router.Run()
}