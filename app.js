
var gameTitle = "doom";

          
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
            $("#title").append(  response.result.title );
            $("#date").append( response.result.releaseDate );

         
            })
            var wather = "chicago"

            var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + wather + "&appid=6dd0809eec91b4e92410405a27425ef2";
      
    
          
            $.ajax({
              url: queryURL,
              method: "GET"
            })
              .then(function(response) {
                
                var iconcode = response.weather[0].icon;
                var iconurl = "http://openweathermap.org/img/wn/" + iconcode + "@2x.png";
    
                console.log(response);
                console.log(response.weather[0].icon);
                $('#wicon').attr('src', iconurl);
                coopAPI()
              })