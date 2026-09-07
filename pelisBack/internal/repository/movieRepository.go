package repository

import (
	"errors"
	"fmt"
	"pelis/internal/domain/interfaces"
	"pelis/internal/domain/models"

	"gorm.io/gorm"
)



type movieRepository struct{
	Db *gorm.DB
}


func NewMovieRepository(db *gorm.DB) interfaces.MovieRepositoryInterface{
	return &movieRepository{Db: db}
}


func(m *movieRepository) GetAllMovies(userId uint)([]model.Movie, error){
	var item []model.Movie
	
	e := m.Db.Where("user_id = ?", userId).Find(&item)
	if(e.Error != nil){
		
		return nil, errors.New("Items not found")
	}
	if(len(item) == 0){
		return []model.Movie{}, nil
	}
	return item, nil
}

func (m *movieRepository) GetById(userId uint, idMovie uint)(model.Movie, error){
	var movie model.Movie
	err := m.Db.Where("user_id = ?", userId).First(&movie, idMovie)
	fmt.Println("asdasd", movie.Duration)
	if(err.Error != nil){
		if(errors.Is(err.Error, gorm.ErrRecordNotFound)){
			return movie, errors.New("Item no found")
		}
		return movie, errors.New("Error internal, please try later")
	}
	
	return movie, nil

}

func (m *movieRepository) Save(movie *model.Movie)(error){
	e := m.Db.Create(movie)
	if(e.Error != nil){
		return errors.New("Movie could not be saved")
	}
	return nil
	
}

func (m *movieRepository) DeleteById(userId uint, idMovie uint)error{
	var movie model.Movie
	err := m.Db.Where("user_id = ?", userId).First(&movie, idMovie)
	if( err.Error != nil){
		return errors.New("Item not found")
	}
	m.Db.Delete(&movie)
	return nil

}


func (m *movieRepository) Update(id uint, newMovie *model.Movie) error{
	var movie *model.Movie
	resp := m.Db.Model(&movie).Where("id = ?", id).Updates(&newMovie)
	if(resp.Error != nil){
		return errors.New("Movie could not be update")
	}
	return nil

}

func (m *movieRepository) GetByGenre(genre string)(*[]model.Movie, error){
	var movies []model.Movie

	resp := m.Db.Where("genre = ?", genre).Find(&movies)
	if(resp.Error != nil){
		return nil, errors.New("Genre not found")
	}
	
	return &movies, nil

}

