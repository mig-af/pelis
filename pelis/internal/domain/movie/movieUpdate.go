package movie



type MovieUpdate struct{
	Id uint `json:"id"`
	Name string `json:"name"`
	MovieUrl string `json:"movie_url"`
	PosterUrl string `json:"poster_url"`
	Duration string `json:"duration"`
	Sinopsis string `json:"sinopsis"`
	Genre string `json:"genre"` 
}
func (m *MovieUpdate) GetId() uint { return m.Id }

func (m *MovieUpdate) GetName() string { return m.Name }

func (m *MovieUpdate) GetMovieUrl() string { return m.MovieUrl }

func (m *MovieUpdate) GetPosterUrl() string { return m.PosterUrl }

func (m *MovieUpdate) GetDuration() string { return m.Duration }

func (m *MovieUpdate) GetSinopsis() string { return m.Sinopsis }

func (m *MovieUpdate) GetGenre() string { return m.Genre }