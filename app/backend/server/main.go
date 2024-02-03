package main

import (
	"log"
	"os"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/miniminh/AIELTS/tree/main/app/backend/server/database"
	"github.com/miniminh/AIELTS/tree/main/app/backend/server/reading"
	"github.com/miniminh/AIELTS/tree/main/app/backend/server/user"
	"github.com/miniminh/AIELTS/tree/main/app/backend/server/writing"
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

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Authorization, origin")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, DELETE, GET, PUT, OPTIONS")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(200)
			return
		}
		c.Next()
	}
}

func main() {
	router := gin.Default()
	database.Connect()
	router.Use(CORSMiddleware())
	user.CreateRouting(router)
	reading.CreateRouting(router)
	writing.CreateRouting(router)
	router.Run()
}
