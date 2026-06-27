package movie


type MovieResponse struct{
	Id uint `json:"id"`
	Name string `json:"name"`
	MovieUrl string `json:"movie_url"`
	PosterUrl string `json:"poster_url"`
	Duration string `json:"duration"`
	Sinopsis string `json:"sinopsis"`
	Genre string `json:"genre"`
	
}