package speaking

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Speaking struct {
	ID       primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	Title    string             `bson:"title"   json:"title"`
	Band     string             `bson:"band" json:"band"`
	Passages string             `bson:"passages"   json:"passages"`
}
