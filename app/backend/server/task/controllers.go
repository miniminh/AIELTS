package task

import (
	"context"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/miniminh/AIELTS/tree/main/app/backend/server/common"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func ListTasks(c *gin.Context) {
	var request TaskRequest
	if err := c.ShouldBindQuery(&request); err != nil {
		c.JSON(http.StatusBadRequest, common.NewSimpleErrorResponse(err.Error()))
		return
	}

	findOptions := options.Find()
	findOptions.SetSkip(int64((request.Page - 1) * request.Size))
	findOptions.SetLimit(int64(request.Size))

	listenings, err := Collection.Find(context.TODO(), map[string]string{"type": request.Type}, findOptions)
	if err != nil {
		c.JSON(http.StatusInternalServerError, common.NewErrorResponse(http.StatusInternalServerError, "Internal Server Error", err.Error()))
		log.Fatal(err)
		return
	}

	var result []Task
	err = listenings.All(c.Request.Context(), &result)
	if err != nil {
		c.JSON(http.StatusInternalServerError, common.NewErrorResponse(http.StatusInternalServerError, "Internal Server Error", err.Error()))
		log.Fatal(err)
		return
	}

	total, err := Collection.CountDocuments(context.TODO(), map[string]string{"type": request.Type})
	if err != nil {
		c.JSON(http.StatusInternalServerError, common.NewErrorResponse(http.StatusInternalServerError, "Internal Server Error", err.Error()))
		log.Fatal(err)
		return
	}

	c.JSON(http.StatusOK, common.NewSuccessResponse(result, common.Pagination{
		Page:  request.Page,
		Limit: request.Size,
		Total: total,
	}))
}

func AddTask(c *gin.Context) {
	var listening Task
	if err := c.ShouldBindJSON(&listening); err != nil {
		c.JSON(http.StatusBadRequest, common.NewSimpleErrorResponse("Invalid request body!"))
		return
	}

	_, createdErr := Collection.InsertOne(context.TODO(), listening)
	if createdErr != nil {
		c.JSON(http.StatusInternalServerError, common.NewErrorResponse(http.StatusInternalServerError, "Internal Server Error", createdErr.Error()))
		log.Fatal(createdErr)
		return
	}

	c.JSON(http.StatusOK, common.NewSimpleSuccessResponse(listening))
}
