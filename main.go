package main

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

var validUsers = map[string]string{
	"jayanthmatam":   "230505",
	"parvmehta":      "230741",
	"pratulkoolwal":  "230782",
	"ronavpuri":      "230815",
	"shrastidwivedi": "230982",
	"testuser":       "123456",
}

func main() {
	r := gin.Default()

	// Serve static files (React build)
	//r.Static("/static", "./frontend/build/static")
	//r.StaticFile("/", "./frontend/build/index.html")

	// Route to handle login
	r.POST("/login", login)

	// Route to handle home page
	r.GET("/home", authMiddleware(), home)

	// Start the server
	r.Run(":8080")
}

func login(c *gin.Context) {
	var loginDetails struct {
		Username string `json:"username" form:"username"`
		Password string `json:"password" form:"password"`
	}

	if err := c.ShouldBindJSON(&loginDetails); err != nil {
		fmt.Println("Error binding JSON:", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}

	fmt.Printf("Received login request: %v\n", loginDetails)

	if password, exists := validUsers[loginDetails.Username]; exists && password == loginDetails.Password {
		c.SetCookie("user", loginDetails.Username, 3600, "/", "localhost", false, true)
		c.JSON(http.StatusOK, gin.H{"message": "Login successful"})
	} else {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid username or password"})
	}
}

func home(c *gin.Context) {
	username, _ := c.Get("user")
	c.JSON(http.StatusOK, gin.H{"message": fmt.Sprintf("Welcome to your dashboard, %s!", username)})
}

func authMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		user, err := c.Cookie("user")
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
			c.Abort()
			return
		}
		c.Set("user", user)
		c.Next()
	}
}
