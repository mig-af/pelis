package interfaces

import "pelis/internal/domain/models"

type MovieRepositoryInterface interface {
	GetAllMovies(userId uint) ([]model.Movie, error)
	GetById(userId uint, idMovie uint)(model.Movie, error)
	Save(movie *model.Movie) error
	DeleteById(userId uint, idMovie uint) error
	Update(id uint, newMovie *model.Movie) error
	GetByGenre(genre string)(*[]model.Movie, error)
}