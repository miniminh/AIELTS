package speaking

import (
	"context"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"log"
	"net/http"
)

func FindSpeaking(c *gin.Context) {
	speakings, err := Collection.Find(context.TODO(), bson.D{})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error: " + err.Error()})
		log.Fatal(err)
		return
	}

	var result []Speaking
	err = speakings.All(c.Request.Context(), &result)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error: " + err.Error()})
		log.Fatal(err)
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": result})
}

func AddSpeaking(c *gin.Context) {
	var speaking Speaking
	if err := c.ShouldBindJSON(&speaking); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body!"})
		return
	}

	_, createdErr := Collection.InsertOne(context.TODO(), speaking)
	if createdErr != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error: " + createdErr.Error()})
		log.Fatal(createdErr)
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Speaking task created successfully!"})
}
