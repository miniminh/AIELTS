package user

import (
	"context"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/gin-gonic/gin"
	"github.com/miniminh/AIELTS/tree/main/app/backend/server/common"
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

	secretKey := []byte(os.Getenv("SECRET_KEY"))
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return secretKey, nil
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
		log.Fatal("[AUTH-LOG] Token can not claim 2: " + token.Raw)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Token can not claim!"})
		c.Abort()
		return
	}

	expire, _ := claims.GetExpirationTime()

	// Token expired
	if expire.Time.Unix() < time.Now().Unix() {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "Expired token!"})
		c.Abort()
		return
	}

	c.Set("username", username)
	c.Next()

}

func usernameExists(username string) (int, string, *User) {
	filter := bson.M{}
	filter["username"] = username

	var user User
	err := Collection.FindOne(context.Background(), filter).Decode(&user)
	if err == mongo.ErrNoDocuments {
		return http.StatusNotFound, "Username not found!", nil
	} else if err != nil {
		log.Fatal(err)
		return http.StatusInternalServerError, "Internal server Error: " + err.Error(), nil
	}
	return http.StatusOK, "", &user
}

func Verify(c *gin.Context) {
	username, _ := c.Get("username")

	status, message, user := usernameExists(username.(string))
	if status == http.StatusOK {
		c.JSON(status, gin.H{"message": "Authentication successful", "user": UserResult{
			Username: user.Username,
			ID: user.ID,
			CreatedAt: user.CreatedAt,
		}})
	} else {
		c.JSON(status, gin.H{"message": message})
	}
}

func Register(c *gin.Context) {
	var user User
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body!"})
		return
	}

	userExist, _, _ := usernameExists(user.Username)
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

	token, err := common.GenerateToken(map[string]interface{}{"username": user.Username})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error: " + err.Error()})
		log.Fatal(err)
	}

	user.ID = createdUser.InsertedID.(primitive.ObjectID)
	c.JSON(http.StatusOK, gin.H{"message": "User registered successfully", "token": token})
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

	token, err := common.GenerateToken(map[string]interface{}{"username": user.Username})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error: " + err.Error()})
		log.Fatal(err)
	}

	c.JSON(http.StatusOK, gin.H{"message": "User logged in successfully", "token": token})
}
