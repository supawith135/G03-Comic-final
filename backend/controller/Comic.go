package controller

import (
	"net/http"
	"github.com/gin-gonic/gin"
	"github.com/Thadthon08/sa-66-Comic/entity"
)

//POST /Comic

func CreateComic(c *gin.Context) {
	var comic entity.Comic
	var category entity.Category

	// bind เข้าตัวแปร comic
	if err := c.ShouldBindJSON(&comic); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"errorb": err.Error()})
		return
	}
	//ค้าหา category ด้วย id
	if tx := entity.DB().Where("id = ?", comic.CategoryID).First(&category); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "category not found"})
		return
	}
	

	//สร้าง comic
	u := entity.Comic{
		Category:    category,          //โยงความสัมพันะ์กับ Entity Category
		Title:       comic.Title,       //ตั้งค่าฟิลด์ Title
		Description: comic.Description, //ตั้งค่าฟิลด์ Description
		Url:         comic.Url,         //ตั้งค่าฟิลด์ Url
		Price:       comic.Price,       //ตั้งค่าฟิลด์ Price
		Image:       comic.Image,       //ตั้งค่าฟิลด์ Image
	}

	//บันทึก
	if err := entity.DB().Create(&u).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"errorC": err.Error()})
		return	
	}
	c.JSON(http.StatusOK, gin.H{"data": u})

}

// GET /comic/:id
	
func GetComic(c *gin.Context){
	var comics entity.Comic
	id := c.Param("id")
	if err := entity.DB().Preload("Category").Raw("SELECT * FROM comics WHERE id = ?", id).Find(&comics).Error; err != nil{
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": comics})
}
// GET /comic
func ListComics(c *gin.Context){
	var comics []entity.Comic
	if err := entity.DB().Preload("Category").Raw("SELECT * FROM comics").Find(&comics).Error; err != nil{
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": comics})
}

//DELETE /comic/:id
func DeleteComic(c *gin.Context){
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM comics WHERE id = ?",id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "comic not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data":id})
}

//PACTH /comics
func UpdateComic(c *gin.Context){
	var comic entity.Comic
	var result entity.Comic
	if err := c.ShouldBindJSON(&comic); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	//ค้นหา comic ด้วย id
	if tx := entity.DB().Where("id = ?", comic.ID).First(&result); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "comic not found"})
		return
	}
	if err := entity.DB().Save(&comic).Error; err != nil{
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": &comic})
}

// GET /Category/:id
	
func GetCategory(c *gin.Context){
	var category entity.Category
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM categories WHERE id = ?", id).Find(&category).Error; err != nil{
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": category})
}