package user

import (
	"context"
	"log"
	"net/http"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"golang.org/x/crypto/bcrypt"
)

func AuthMiddleware(c *gin.Context) {
	tokenString := c.GetHeader("Authorization")
	if tokenString == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		c.Abort()
		return
	}

	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return SecretKey, nil
	})

	if err != nil || !token.Valid {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token!"})
		c.Abort()
		return
	}
	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		log.Fatal("[AUTH-LOG] Token can not claim: " + token.Raw)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Token can not claim!"})
		c.Abort()
		return
	}

	username, exists := claims["username"].(string)
	if !exists {
		log.Fatal("[AUTH-LOG] Token can not claim: " + token.Raw)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Token can not claim!"})
		c.Abort()
		return
	}

	c.Set("username", username)
	c.Next()

}

func usernameExists(username string) (int, string) {
	filter := bson.M{}
	filter["username"] = username

	var user User
	err := Collection.FindOne(context.Background(), filter).Decode(&user)
	if err == mongo.ErrNoDocuments {
		return http.StatusNotFound, "Username not found!"
	} else if err != nil {
		log.Fatal(err)
		return http.StatusInternalServerError, "Internal server Error: " + err.Error()
	}
	return http.StatusFound, ""
}

func Verify(c *gin.Context) {
	username, _ := c.Get("username")

	status, message := usernameExists(username.(string))
	if status == http.StatusFound {
		c.JSON(status, gin.H{"message": "Authentication successful"})
	} else {
		c.JSON(status, gin.H{"message": message})
	}
}

func generateToken(user User) string {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"username": user.Username,
		"id":       user.ID.Hex(),
	})

	tokenString, err := token.SignedString(SecretKey)
	if err != nil {
		log.Fatal("Error generating token:" + err.Error())
		return ""
	}

	return tokenString
}

func Register(c *gin.Context) {
	var user User
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body!"})
		return
	}

	userExist, _ := usernameExists(user.Username)
	if userExist != http.StatusNotFound {
		c.JSON(http.StatusNotAcceptable, gin.H{"error": "Username already exists!"})
		return
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		log.Fatal(err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error: " + err.Error()})
		return
	}

	user.Password = string(hashedPassword)
	user.CreatedAt = time.Now()

	createdUser, createdErr := Collection.InsertOne(context.TODO(), user)
	if createdErr != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error: " + createdErr.Error()})
		log.Fatal(createdErr)
		return
	}

	user.ID = createdUser.InsertedID.(primitive.ObjectID)
	c.JSON(http.StatusOK, gin.H{"message": "User registered successfully", "token": generateToken(user)})
}

func Login(c *gin.Context) {
	var user User
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body!"})
		return
	}
	password := user.Password

	filter := bson.M{}
	filter["username"] = user.Username

	err := Collection.FindOne(context.Background(), filter).Decode(&user)
	if err == mongo.ErrNoDocuments {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Username not found!"})
		return
	} else if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error: " + err.Error()})
		log.Fatal(err)
	}

	comparePassword := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))
	if comparePassword != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Password unmatch!"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "User logged in successfully", "token": generateToken(user)})
}
