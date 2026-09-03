package model

import (
	"pelis/internal/domain/movie"
	"strings"

	"gorm.io/gorm"
)




type Movie struct{
	gorm.Model
	Title string 
	Year string
	MovieUrl string 
	Image string
	Duration string 
	Description string 
	Director string
	Cast string
	Genre string 
	Rating string
	UserID uint 
	User User
}

func (m *Movie)Update (newData *movie.MovieUpdate)*Movie{
	
	m.Title =  m.VerifyBlank(newData.GetTitle(), m.Title)
	m.Year = m.VerifyBlank(newData.GetYear(), m.Year)
	m.MovieUrl = m.VerifyBlank(newData.GetMovieUrl(), m.MovieUrl)
	m.Image = m.VerifyBlank(newData.GetImage(), m.Image)
	m.Duration = m.VerifyBlank(newData.GetDuration(), m.Duration)
	m.Description = m.VerifyBlank(newData.GetDescription(), m.Description)
	m.Director = m.VerifyBlank(newData.GetDirector(), m.Director)
	m.Cast = m.VerifyBlank(newData.GetCast(), m.Cast)
	m.Genre = m.VerifyBlank(newData.GetGenre(), m.Genre)
	m.Rating = m.VerifyBlank(newData.GetRating(), m.Rating)
	return m
}
func (m *Movie)VerifyBlank(neww string, old string)string{
	if(neww == ""){
		return old
	}
	return neww
}

func (m *Movie)FromPost(moviePost *movie.MoviePost, userId uint)*Movie{
	
	m.Title = moviePost.Title
	m.Year = moviePost.Year
	m.MovieUrl = moviePost.MovieUrl
	m.Image = moviePost.Image
	m.Duration = moviePost.Duration
	m.Description = moviePost.Description
	m.Director = moviePost.Director
	m.Cast = moviePost.Cast
	m.Genre = strings.ToLower(strings.TrimSpace(moviePost.Genre))
	m.Rating = moviePost.Rating
	m.UserID = userId
	return m
}


func (m *Movie) GetId()uint{
	return m.ID
}


func (m *Movie) GetTitle() string {
	return m.Title
}

func (m *Movie) GetYear() string {
	return m.Year
}

func (m *Movie) GetMovieUrl() string {
	return m.MovieUrl
}

func (m *Movie) GetImage() string {
	return m.Image
}

func (m *Movie) GetDuration() string {
	return m.Duration
}

func (m *Movie) GetDescription() string {
	return m.Description
}

func (m *Movie) GetDirector() string {
	return m.Director
}

func (m *Movie) GetCast() string {
	return m.Cast
}

func (m *Movie) GetGenre() string {
	return m.Genre
}

func (m *Movie) GetRating() string {
	return m.Rating
}
