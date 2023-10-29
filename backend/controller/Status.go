package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/Thadthon08/sa-66-Comic/entity"
)

func ListStatus(c *gin.Context) {
	var statuses []entity.Status
	if err := entity.DB().Raw("SELECT * FROM statuses").Find(&statuses).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": statuses})
}
