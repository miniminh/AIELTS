package reading

import (
	"github.com/gin-gonic/gin"
	"github.com/miniminh/AIELTS/tree/main/app/backend/server/database"
	"github.com/miniminh/AIELTS/tree/main/app/backend/server/user"
	"go.mongodb.org/mongo-driver/mongo"
)

var Collection *mongo.Collection

func loadCollection() {
	Collection = database.Database.Collection("Reading")
}

func CreateRouting(router *gin.Engine) {
	loadCollection()
	router.Use(user.AuthMiddleware)
	reading := router.Group("/readings")
	{
		reading.GET("/", FindReading)
		reading.POST("/", AddReading)
	}
}
