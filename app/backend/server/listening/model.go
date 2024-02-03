package listening

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Listening struct {
	ID     primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	Title  string             `bson:"title"   json:"title"`
	Band   string             `bson:"band" json:"band"`
	Passages  string             `bson:"passages"   json:"passages"`
	Audio  string             `bson:"audio"   json:"audio"`
	Answer []string           `bson:"answer"   json:"answer"`
}