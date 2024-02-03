package writing

import (
	"github.com/gin-gonic/gin"
	"github.com/miniminh/AIELTS/tree/main/app/backend/server/database"
	"github.com/miniminh/AIELTS/tree/main/app/backend/server/user"
	"go.mongodb.org/mongo-driver/mongo"
)

var Collection *mongo.Collection

func loadCollection() {
	Collection = database.Database.Collection("Writing")
}

func CreateRouting(router *gin.Engine) {
	loadCollection()
	router.Use(user.AuthMiddleware)
	reading := router.Group("/writings")
	{
		reading.GET("", FindWriting)
		reading.POST("", AddWriting)
	}
}