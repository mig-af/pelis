package repository

import (
	"gorm.io/gorm"
	"pelis/internal/domain/models"
)



type MovieRepository struct{
	Db *gorm.DB
}



func(m *MovieRepository) GetAllMovies()([]model.Movie, error){
	var item []model.Movie
	
	e := m.Db.Find(&item)
	if(e.Error != nil){
		return nil, e.Error
	}
	return item, nil
}

func (m *MovieRepository) GetById(id uint)(model.Movie, error){
	var movie model.Movie
	err := m.Db.First(&movie, id)
	if(err.Error != nil){
		return movie, err.Error
	}
	
	return movie, nil

}

func (m *MovieRepository) Save(movie *model.Movie)(error){
	e := m.Db.Create(movie)
	if(e.Error != nil){
		return e.Error
	}
	return nil
	
}

func (m *MovieRepository) DeleteById(id uint)error{
	var movie model.Movie
	err := m.Db.First(&movie, id)
	if( err.Error != nil){
		return err.Error
	}
	m.Db.Delete(&movie)
	return nil

}


func (m *MovieRepository) Update(id uint, newMovie *model.Movie) error{
	var movie *model.Movie
	resp := m.Db.Model(&movie).Where("id = ?", id).Updates(&newMovie)
	if(resp.Error != nil){
		return resp.Error
	}
	return nil

}


