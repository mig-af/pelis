package security


import (
	"testing"
)


func TestGenerateRefreshToken(t *testing.T){

	resp := GenerateRefreshToken()
	if(len(resp)==0){
		t.Fail()
	}
	t.Log(resp)
}


func TestHashToken(t *testing.T){
	cases := []struct{

		Name string
		Param1 string
		Param2 string 
		IsSimilar bool		
	}{
		{Name: "Strings iguales", Param1: "elefante", Param2: "elefante", IsSimilar: true},
		{Name: "Strings distintos", Param1: "gato", Param2: "gatos", IsSimilar: false},
		{Name: "String vacio", Param1: "", Param2: "", IsSimilar: true},

	}
	for _, v := range cases{
		t.Run(v.Name, func(t *testing.T) {

			resp1 := HashRefreshToken(v.Param1)
			resp2 := HashRefreshToken(v.Param2)
			similar := resp1 == resp2
			t.Log(resp1, resp2)
			if(similar != v.IsSimilar){
				t.Fatal()
			}
			
		})
	}
}