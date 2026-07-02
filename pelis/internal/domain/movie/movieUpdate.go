package movie



type MovieUpdate struct{
	Id uint `json:"id"`
	Title string 		`json:"title"`
	Year string	  		`json:"year"`
	MovieUrl string 	`json:"movie_url"`
	Image string		`json:"image"`
	Duration string 	`json:"duration"`
	Description string 	`json:"description"`
	Director string	   	`json:"director"`
	Cast string			`json:"cast"`
	Genre string 		`json:"genre"`
	Rating string		`json:"rating"`
}

func (m *MovieUpdate) GetId() uint {
	return m.Id
}

func (m *MovieUpdate) GetTitle() string {
	return m.Title
}

func (m *MovieUpdate) GetYear() string {
	return m.Year
}

func (m *MovieUpdate) GetMovieUrl() string {
	return m.MovieUrl
}

func (m *MovieUpdate) GetImage() string {
	return m.Image
}

func (m *MovieUpdate) GetDuration() string {
	return m.Duration
}

func (m *MovieUpdate) GetDescription() string {
	return m.Description
}

func (m *MovieUpdate) GetDirector() string {
	return m.Director
}

func (m *MovieUpdate) GetCast() string {
	return m.Cast
}

func (m *MovieUpdate) GetGenre() string {
	return m.Genre
}

func (m *MovieUpdate) GetRating() string {
	return m.Rating
}