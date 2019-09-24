
var APIKey = "b0a53649e3b2f66244248de7fbda54bc";
var searchLocation;
var queryURL;
var weatherDesc;

$("#location-input").keyup(function(e){
    e.preventDefault();
    if(e.keyCode === 13){
        $("#weather-search").click();
    }
});

$("#weather-search").on("click", function(e){
    e.preventDefault();
    searchLocation = $("#location-input").val().trim();
    queryURL = "https://api.openweathermap.org/data/2.5/weather?zip=" + searchLocation + "&units=imperial&appid=" + APIKey;
    console.log(queryURL);
    isNumber();
    $("#location-input").val("");   


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        $(".temp").text("Temperature (F) " + response.main.temp);
        $(".city").text("City: " + response.name);
        $(".weather").text(response.weather[0].description);
        weatherDesc = response.weather[0].description;
        if(weatherDesc == "clear sky"){
            $(".weather-pic").attr("src", "https://wallpaperplay.com/walls/full/e/c/1/4849.jpg");
        }
        else if(weatherDesc == "few clouds"){
            $(".weather-pic").attr("src", "https://www.barraques.cat/pngfile/big/14-142373_clouds-wallpaper-hd-blue-sky-with-few-clouds.jpg");
        }
        else if(weatherDesc == "scattered clouds"){
            $(".weather-pic").attr("src", "https://jooinn.com/images/clouds-scattering-1.jpg");
        }
        else if(weatherDesc == "broken clouds"){
            $(".weather-pic").attr("src", "https://wallpaperplay.com/walls/full/6/3/4/14770.jpg");
        }
        else if(weatherDesc == "moderate rain"){
            $(".weather-pic").attr("src", "https://i.imgur.com/cR9gUfL.jpg");
        }
        else if(weatherDesc == "rain"){
            $(".weather-pic").attr("src", "https://steamuserimages-a.akamaihd.net/ugc/167031304794218348/74D9015CAE610132872CC50585AB42DBA2DF1333/");
        }
        else if(weatherDesc == "thunderstorm"){
            $(".weather-pic").attr("src", "assets/images/2914282-rain-storm__mixed-wallpapers.jpg");
        }
        else if(weatherDesc == "snow"){
            $(".weather-pic").attr("src", "https://i.redd.it/u23xeb233hp01.jpg");
        }
        else if(weatherDesc == "haze" || weatherDesc == "mist"){
            $(".weather-pic").attr("src", "https://i.redd.it/wwgzqzqp0p401.jpg");
        }

        console.log(response);
    });
    console.log(weatherDesc);
});

function isNumber(){
    if(isNaN(searchLocation) || searchLocation < 10050 || searchLocation > 99950){
    }
}

