package common

import (
	"github.com/golang-jwt/jwt/v5" //sign json web token
	"os"                           // load .env
)

func GenerateToken(data map[string]interface{}) (string, error) {
	// Create token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"username": data["username"],
	})

	// Sign with secret key
	secretKey := []byte(os.Getenv("SECRET_KEY"))
	tokenString, err := token.SignedString(secretKey)
	if err != nil {
		return "", err
	}

	return tokenString, nil
}
