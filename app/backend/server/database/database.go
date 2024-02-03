package database

import (
	"context"
	"fmt"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"log"
	"os"
)

var Database *mongo.Database

func Connect() {
	clientOptions := options.Client().ApplyURI(os.Getenv("DB_URI"))

	client, err := mongo.Connect(context.TODO(), clientOptions)
	if err != nil {
		log.Fatal(err)
	}

	err = client.Ping(context.TODO(), nil)
	if err != nil {
		log.Fatal(err)
	}

	LoadDatabase(client)

	fmt.Println("[Database-LOG] Connected to MongoDB!")
}

func LoadDatabase(client *mongo.Client) {
	db_name := os.Getenv("DB_NAME")
	if db_name == "" {
		db_name = "AIELTS"
	}

	Database = client.Database(db_name)

	fmt.Printf("[Database-LOG] Using database %s!\n", db_name)
}
