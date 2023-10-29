package entity

import (

	"time"

	"gorm.io/gorm"
)

type Payment struct {
	gorm.Model
	Image       string `gorm:"type:longtext"`
	Date      time.Time

	BasketID *uint
	Basket Basket `gorm:"references:id"`

	StatusID *uint
	Status 	Status `gorm:"references:id"`
	
	Appove []Appove `gorm:"foreignKey:PaymentID"`
}
type Status struct {
	gorm.Model
	Status string

	Payment []Payment `gorm:"foreignKey:StatusID"`


}
type Basket struct {
	gorm.Model
	Total float64

	MemberID *uint
	Member Member  `gorm:"references:id"`

	ComicID *uint
	Comic Comic  	`gorm:"references:id"`

	Payment []Payment `gorm:"foreignKey:BasketID"`
	
}
type Member struct {
	gorm.Model
	Email string
	Username string
	Password string

	GenderID *uint
	Gender Gender  	`gorm:"references:id"`
	Basket []Basket `gorm:"foreignKey:MemberID"`
}
type Appove struct {
	gorm.Model
	Note string

	AdminID *uint
	Admin Admin  `gorm:"references:id"`

	PaymentID *uint
	Payment Payment   `gorm:"references:id"`

}


type Admin struct {
	gorm.Model
	Email string `gorm:"uniqueIndex;"`
	Password string

	Appove []Appove `gorm:"foreignKey:AdminID"`
	Comic []Comic `gorm:"foreignKey:AdminID"`

}


type Gender struct {
	gorm.Model
	Name string

	Member []Member `gorm:"foreignKey:GenderID"`

}

type Comic struct {
	gorm.Model
	Image string  `gorm:"type:longtext"`
	Title string `gorm:"uniqueIndex;"`
	Description string
	Url string `gorm:"uniqueIndex;"`
	Price float64

	CategoryID *uint
	Category Category `gorm:"foreignKey:CategoryID"`

	AdminID *uint
	Admin Admin  `gorm:"references:id"`

	Basket []Basket `gorm:"foreignKey:ComicID"`
	Review []Review `gorm:"foreignKey:ComicID"`
	
}

type Category struct {
	gorm.Model
	Name string `gorm:"uniqueIndex;"`
	
	Comic []Comic `gorm:"foreignKey:CategoryID"`

}

type Review struct {
	gorm.Model
	Comment string

	ComicID *uint
	Comic Comic  `gorm:"references:id"`

	

	RatingID *uint
	Rating Rating  `gorm:"references:id"`
}

type Rating struct {
	gorm.Model
	Score uint

	Review []Review  `gorm:"foreignKey:RatingID"`
}
