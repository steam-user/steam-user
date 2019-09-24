
var APIKey = "b0a53649e3b2f66244248de7fbda54bc";
var searchLocation;
var queryURL;

$("#location-input").keyup(function(e){
    e.preventDefault();
    if(e.keyCode === 13){
        $("#weather-search").click();
    }
});

$("#weather-search").on("click", function(e){
    e.preventDefault();
    searchLocation = $("#location-input").val().trim();
    var alphabet = "abcdefghijklmnopqrstuvwxyz";
    if(alphabet.includes(searchLocation)){
        console.log("hi");
    }
    queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
    "zip=" + searchLocation + "&units=imperial&appid=" + APIKey;
    console.log(queryURL);
    $("#location-input").val("");   


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        $(".temp").text("Temperature (F) " + response.main.temp);
        $(".city").text("City: " + response.name);
        $(".weather").text(response.weather[0].description);
        var weatherDesc = response.weather[0].description;
        if(weatherDesc == "clear sky"){
            $(".wrapping").attr("id", "clear");
        }
        else if(weatherDesc == "few clouds"){
            $(".wrapping").attr("id", "few-clouds");
        }
        else if(weatherDesc == "scattered clouds"){
            $(".wrapping").attr("id", "scattered-clouds");
        }
        else if(weatherDesc == "broken clouds"){
            $(".wrapping").attr("id", "broken-clouds");
        }
        else if(weatherDesc == ""){
            $(".wrapping").attr("id", "");
        }
        else if(weatherDesc == ""){
            $(".wrapping").attr("id", "");
        }
        else if(weatherDesc == ""){
            $(".wrapping").attr("id", "");
        }

        console.log(response);
    });
});

