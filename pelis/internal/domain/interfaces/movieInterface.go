package interfaces


type MovieInterface interface{
	GetId()uint
	GetName()string
	GetMovieUrl() string
	GetPosterUrl() string 
	GetDuration() string 
	GetSinopsis() string 
	GetGenre() string 
}