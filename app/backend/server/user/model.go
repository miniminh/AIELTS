package user

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
	"time"
)

type User struct {
	ID        primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	Username  string             `bson:"username"   json:"username"`
	Password  string             `bson:"password"   json:"password"`
	CreatedAt time.Time          `bson:"created_at" json:"created_at"`
}

type UserResult struct {
	ID        primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	Username  string             `bson:"username"   json:"username"`
	CreatedAt time.Time          `bson:"created_at" json:"created_at"`
}