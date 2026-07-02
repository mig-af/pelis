package movie


type MovieResponse struct{
	Id uint 			`json:"id"`
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