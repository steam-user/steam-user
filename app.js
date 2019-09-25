var apiKey = "6c53f7c8d47541c30f1c1edba2d40154a9c3a1d4";
var weatherAPI = "b0a53649e3b2f66244248de7fbda54bc";
var cors = "https://cors-anywhere.herokuapp.com/";

var arrayCold = ["Super Mario Odyssey",
  "Crash Team Racing Nitro-Fueled",
  "Dead Space 2",
  "Wii Sports Resort",
  "SSX 3",
  "Sea of Thieves",
  "Rise of the Tomb Raider",
  "Horizon Zero Dawn",
  "Until Dawn",
  "Steep",
  "Skyrim",
  "Bayonetta 2",
  "Silent Hill: Shattered Memories",
  "Celeste"
]

var arrayHot = ["Super Mario Odyssey",
  "Nier Automata",
  "Journey",
  "Battlefield: Bad Company 2",
  "Fallout New Vegas",
  "Doom",
  "Agony",
  "Dante's Inferno",
  "Diablo III",
  "Super Meat Boy",
  "God of War",
  "Dark Souls III",
  "The Elder Scrolls III: Morrowind"
]

$("#modal-button").on("click", function(e){
  e.preventDefault();
  $("#modal").toggleClass("hidden");
});

$("#location-input").keyup(function (e) {
  e.preventDefault();
  if (e.keyCode === 13) {
    $("#weather-search").click();
  }
});

$("#weather-search").on("click", function (e) {
  e.preventDefault();
  var searchLocation = $("#location-input").val().trim();
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?zip=" + searchLocation + "&units=imperial&appid=" + weatherAPI;
  console.log(queryURL);
  $("#location-input").val("");
  if(!isNumber(searchLocation)){
    $("#modal").attr("class", "appear");
    $("#modal-text").html("Enter Numbers!!!!! >:(");
    return;
  }

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
                var iconcode = response.weather[0].icon;
                var iconurl = "http://openweathermap.org/img/wn/" + iconcode + "@2x.png";
    
                console.log(response);
                console.log(response.weather[0].icon);
                $('#wicon').attr('src', iconurl);
    var temperature = Math.round(response.main.temp);
    $(".temp").text("Temperature (F) " + temperature);
    $(".city").text("City: " + response.name);
    var weatherDesc = response.weather[0].description;
    $(".weather").text(weatherDesc);
    console.log(weatherDesc);
    console.log(response);
    weatherImage(weatherDesc);
    var gameTitle = gameRandom(temperature);
    bombAPI(gameTitle);
  }).catch(function(error){
    $("#modal").attr("class", "appear");
    $("#modal-text").html("Zip code doesn't exist :(");
  });
});

function isNumber(string) {
  if (isNaN(string) || string < 10050 || string > 99950) {
    return false;
  }
  else{
    return true;
  }
}
function gameRandom(temperature) {
  if (temperature >= 76) {
    randomNum = Math.floor(Math.random() * arrayHot.length);
    console.log(arrayHot[randomNum]);
    return arrayHot[randomNum]
  }
  else {
    randomNum = Math.floor(Math.random() * arrayCold.length);
    console.log(arrayCold[randomNum]);
    return arrayCold[randomNum]
  }
}

function weatherImage(weatherDesc){
  if (weatherDesc == "clear sky") {
    $(".weather-pic").attr("src", "https://wallpaperplay.com/walls/full/e/c/1/4849.jpg");
  }
  else if (weatherDesc.includes("clouds")) {
    $(".weather-pic").attr("src", "https://jooinn.com/images/clouds-scattering-1.jpg");
  }
  else if (weatherDesc.includes("rain")) {
    $(".weather-pic").attr("src", "https://steamuserimages-a.akamaihd.net/ugc/167031304794218348/74D9015CAE610132872CC50585AB42DBA2DF1333/");
  }
  else if (weatherDesc == "thunderstorm") {
    $(".weather-pic").attr("src", "images/2914282-rain-storm__mixed-wallpapers.jpg");
  }
  else if (weatherDesc == "snow") {
    $(".weather-pic").attr("src", "https://i.redd.it/u23xeb233hp01.jpg");
  }
  else if (weatherDesc == "haze" || weatherDesc == "mist") {
    $(".weather-pic").attr("src", "https://i.redd.it/wwgzqzqp0p401.jpg");
  }
}

function bombAPI(gameTitle) {
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": cors + "http://www.giantbomb.com/api/search/?limit=1&api_key=" + apiKey + "&format=JSON&query=" + gameTitle,

  }
  $.ajax(settings).done(function (response) {
    console.log(response);

    $("#dump").html("<img class='ui centered medium image' src=" + response.results[0].image.small_url + " alt='" + response.results[0].name + " box art'>");
    $("#title").html("<h4>" + response.results[0].name + "</h4>");
    $("#date").html(response.results[0].expected_release_year);
    $("#desc").html(response.results[0].deck);
    $("#lilTitle").html(response.results[0].name);
    $("#info").html("<a href='" + response.results[0].site_detail_url + "'>More Info</a>");
    
    //for loop to pull each platform game is on
    $("#platform").html("Available on: ");
    var p;
    for (p = 0; p < response.results[0].platforms.length; p++) {
      $("#platform").append(response.results[0].platforms[p].name + " ");
    }
    //change month # to name
    var monthify = moment(response.results[0].expected_release_month).format('MMMM');
    $("#release").html("Released on: " + monthify + " " + response.results[0].expected_release_day + ", " + response.results[0].expected_release_year);
    //Displays ESRB rating image based on ...rating
    if (response.results[0].original_game_rating[0].name == "ESRB: M") {
      $("#esrb").html("<img src=images/M.svg></img>")
    }
    else if (response.results[0].original_game_rating[0].name == "ESRB: T") {
      $("#esrb").html("<img src=images/T.svg></img>")
    }
    else {
      $("#esrb").html("<img src=images/E.svg></img>")
    }


  })
}