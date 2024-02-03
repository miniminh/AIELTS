package writing

import (
	"context"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"log"
	"net/http"
)

func FindWriting(c *gin.Context) {
	writings, err := Collection.Find(context.TODO(), bson.D{})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error: " + err.Error()})
		log.Fatal(err)
		return
	}

	var result []Writing
	err = writings.All(c.Request.Context(), &result)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error: " + err.Error()})
		log.Fatal(err)
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": result})
}

func AddWriting(c *gin.Context) {
	var writing Writing
	if err := c.ShouldBindJSON(&writing); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body!"})
		return
	}

	_, createdErr := Collection.InsertOne(context.TODO(), writing)
	if createdErr != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error: " + createdErr.Error()})
		log.Fatal(createdErr)
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Writing task created successfully!"})
}
