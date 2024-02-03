package user

import (
	"github.com/gin-gonic/gin"
	"os"
	"log"
	"github.com/miniminh/AIELTS/tree/main/app/backend/database"
	"go.mongodb.org/mongo-driver/mongo"
)

var SecretKey []byte
var Collection *mongo.Collection

func loadSecretKey() {
	SecretKey = []byte(os.Getenv("SECRET_KEY"))
	if len(SecretKey) == 0 {
		log.Fatal("No secret key found!")
	}
}

func loadCollection() {
	Collection = database.Database.Collection("User")
}

func CreateRouting(router *gin.Engine) {
	loadSecretKey()
	loadCollection()
	auth := router.Group("/auth") 
	{
		auth.GET("/", AuthMiddleware, Verify)
		auth.POST("/register", Register)
		auth.POST("/login", Login)
	}
}