package task

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Task struct {
	ID       primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	Type     string             `bson:"type" json:"type"`
	Title    string             `bson:"title"   json:"title"`
	Band     string             `bson:"band" json:"band"`
	Passages string             `bson:"passages"   json:"passages"`
	Audio    string             `bson:"audio,omitempty" json:"audio,omitempty"`
	Answer   []string           `bson:"answer,omitempty" json:"answer,omitempty"`
}

type TaskRequest struct {
	Page int32  `form:"page" binding:"min=1"`
	Size int32  `form:"size" binding:"min=1,max=12"`
	Type string `form:"type" binding:"oneof=Listening Reading Writing Speaking"`
}
