package controller

import (
	"net/http"
	"github.com/gin-gonic/gin"
	"github.com/Thadthon08/sa-66-Comic/entity"
)
//GET /category
func ListCategory(c *gin.Context){
	var categories []entity.Category
	if err := entity.DB().Raw("SELECT * FROM categories").Scan(&categories).Error; err != nil{
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": categories})
}