package model

import (
	"pelis/internal/domain/movie"

	"gorm.io/gorm"
)




type Movie struct{
	gorm.Model
	Name string 
	MovieUrl string 
	PosterUrl string
	Duration string 
	Sinopsis string 
	Genre string 
	UserID uint 
	User User
}

func (m *Movie)Update (newData *movie.MovieUpdate)*Movie{
	
	m.Name =  m.VerifyBlank(newData.GetName(), m.Name)
	m.MovieUrl = m.VerifyBlank(newData.MovieUrl, m.MovieUrl)
	m.PosterUrl = m.VerifyBlank(newData.PosterUrl, m.PosterUrl)
	m.Duration = m.VerifyBlank(newData.Duration, m.Duration)
	m.Sinopsis = m.VerifyBlank(newData.Sinopsis, m.Sinopsis)
	m.Genre = m.VerifyBlank(newData.Genre, m.Genre)
	return m
}
func (m *Movie)VerifyBlank(neww string, old string)string{
	if(neww == ""){
		return old
	}
	return neww
}

func (m *Movie) GetId()uint{
	return m.ID
}
func (m *Movie) GetName()string{
	return m.Name
}
func (m *Movie) GetMovieUrl()string{
	return m.MovieUrl
}
func (m *Movie) GetPosterUrl()string{
	return m.PosterUrl
}
func (m *Movie) GetDuration()string{
	return m.Duration
}
func (m *Movie) GetSinopsis()string{
	return m.Sinopsis
}
func (m *Movie) GetGenre()string{
	return m.Genre
}
