package main

import (
	"github.com/Thadthon08/sa-66-Comic/controller"
	"github.com/Thadthon08/sa-66-Comic/entity"
	"github.com/gin-gonic/gin"
)

const PORT = "8080"

func main() {
	entity.SetupDatabase()
	r := gin.Default()

	r.Use(CORSMiddleware())

	//Payment 
	r.POST("/Payment", controller.CreatePayment)
	r.GET("/Payment/:id", controller.GetPayment)
	r.GET("/Payments", controller.ListPayment)
	r.PATCH("/Payment", controller.UpdatePayment)
	r.DELETE("/Payments/:id", controller.DeletePayment)

	r.GET("/Statuses", controller.ListStatus)

	//Admin
	r.GET("/comics", controller.ListComics)
	r.GET("/comics/:id", controller.GetComic)
	r.POST("/comics", controller.CreateComic)
	r.PATCH("/comics", controller.UpdateComic)
	r.DELETE("/comics/:id", controller.DeleteComic)
	// Category Routes
	r.GET("/category", controller.ListCategory)
	r.GET("/category/:id", controller.GetCategory)
	r.GET("/basket", controller.GetBasket)
	// Review
	r.GET("/Reviews/:id", controller.GetReview)
	r.POST("/Reviews", controller.Createreview)
	r.GET("/Reviews", controller.ListReviews)
	r.GET("/Ratings", controller.ListRating)
	r.PATCH("/Reviews",controller.UpdateReview)
	// r.GET("/Reviews", controller.CalculateAverageRatings)
	//Basket
	r.GET("/baskets", controller.ListBasket)
	r.Run()
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE, PATCH")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
