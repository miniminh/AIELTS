package reading

import (
	"context"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"log"
	"net/http"
)

func FindReading(c *gin.Context) {
	readings, err := Collection.Find(context.TODO(), bson.D{})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error: " + err.Error()})
		log.Fatal(err)
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": readings})
}

func AddReading(c *gin.Context) {
	var reading Reading
	if err := c.ShouldBindJSON(&reading); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body!"})
		return
	}

	_, createdErr := Collection.InsertOne(context.TODO(), reading)
	if createdErr != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error: " + createdErr.Error()})
		log.Fatal(createdErr)
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Reading task created successfully!"})
}
