       
       
         var wather = "chicago";
         var gameTitle = "doom";

          function coopAPI(){
            var settings = {
                    "async": true,
                    "crossDomain": true,
                    "url": "https://chicken-coop.p.rapidapi.com/games/" + gameTitle ,
                    "headers": {
                        "x-rapidapi-host": "chicken-coop.p.rapidapi.com",
                        "x-rapidapi-key": "cf22db5c2amsh5425127165ca0fbp1f6538jsna77bb7d90df5"
                    }
                } 

                    $.ajax(settings).done(function (response) {
                   console.log(response);

            $("#dump").html("<img class='ui centered medium image' src=" + response.result.image + ">");
            $("#title").html("<h1>" + response.result.title + "</h1>");
            $("#date").html("<h3>" + response.result.releaseDate + "</h3>");

         
            })
        }

          
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + wather + "&appid=6dd0809eec91b4e92410405a27425ef2";
    
      
        $.ajax({
          url: queryURL,
          method: "GET"
        })
          .then(function(response) {
    
           
            console.log(response);
            $("#main").html("<h3>" + response.main.temp + "</h3>");
            coopAPI()
          })
       
       

        
        
    
        
       
