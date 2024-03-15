package user

import (
	"github.com/gin-gonic/gin"
	"github.com/miniminh/AIELTS/tree/main/app/backend/server/database"
	"go.mongodb.org/mongo-driver/mongo"
)

var Collection *mongo.Collection

func loadCollection() {
	Collection = database.Database.Collection("User")
}

func CreateRouting(router *gin.Engine) {
	loadCollection()
	auth := router.Group("/auth")
	{
		auth.GET("/", AuthMiddleware, Verify)
		auth.POST("/register", Register)
		auth.POST("/login", Login)
	}
}
