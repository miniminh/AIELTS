package main

import (
	"context"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"os"
	"log"
	"fmt"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
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
	LoadDatabase()
}

func LoadDatabase() {
	clientOptions := options.Client().ApplyURI(os.Getenv("DB_URI"))

	client, err := mongo.Connect(context.TODO(), clientOptions)
	if err != nil {
		log.Fatal(err)
	}

	err = client.Ping(context.TODO(), nil)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Connected to MongoDB!")

	defer func() {
		if err := client.Disconnect(context.TODO()); err != nil {
			log.Fatal(err)
		}
	}()
}

func main() {
	router := gin.Default()
	router.Run()
}