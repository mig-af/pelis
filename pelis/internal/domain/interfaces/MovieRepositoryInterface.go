package interfaces

import "pelis/internal/domain/models"

type MovieRepositoryInterface interface {
	GetAllMovies() ([]model.Movie, error)
	GetById(id uint) (model.Movie, error)
	Save(movie *model.Movie) error
	DeleteById(id int) error
	Update(id uint, newMovie *model.Movie) error
}