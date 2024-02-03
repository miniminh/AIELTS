package listening

import (
	"context"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"log"
	"net/http"
)

func FindListening(c *gin.Context) {
	listenings, err := Collection.Find(context.TODO(), bson.D{})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error: " + err.Error()})
		log.Fatal(err)
		return
	}

	var result []Listening
	err = listenings.All(c.Request.Context(), &result)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error: " + err.Error()})
		log.Fatal(err)
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": result})
}

func AddListening(c *gin.Context) {
	var listening Listening
	if err := c.ShouldBindJSON(&listening); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body!"})
		return
	}

	_, createdErr := Collection.InsertOne(context.TODO(), listening)
	if createdErr != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error: " + createdErr.Error()})
		log.Fatal(createdErr)
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Listening task created successfully!"})
}
