
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
        console.log(response);
    });
});

