var wather = "chicago";
var cors = "https://cors-anywhere.herokuapp.com/";
var apiKey = "6c53f7c8d47541c30f1c1edba2d40154a9c3a1d4";

var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + wather + "&appid=6dd0809eec91b4e92410405a27425ef2";
var weather;

$.ajax({
  url: queryURL,
  method: "GET"
})
  .then(function (response) {

    weather = response;
    console.log(response);
    $("#main").html("<h3>The temperature is currently: " + response.main.temp + "</h3>");
    bombAPI()
    return (weather);
  })

var arrayHot = ["Super Mario Odyssey",
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
  "Metal Gear Solid",
  "Bayonetta 2",
  "Silent Hill: Shattered Memories",
  "Celeste"
]

var arrayCold = ["Super Mario Odyssey",
  "Nier Automata",
  "Journey",
  "Battlefield: Bad Company 2",
  "Fallout New Vegas",
  "Doom",
  "Red Faction",
  "Agony",
  "Dante's Inferno",
  "Diablo III",
  "Super Meat Boy",
  "God of War",
  "Dark Souls III",
  "Devil May Cry",
  "The Elder Scrolls III: Morrowind"
]


if (weather >= 76) {
  randomNum = Math.floor(Math.random() * arrayHot.length);
  console.log(arrayHot[randomNum]);
  var gameTitle = arrayHot[randomNum]
}
else {
  randomNum = Math.floor(Math.random() * arrayCold.length);
  console.log(arrayCold[randomNum]);
  var gameTitle = arrayCold[randomNum]
}


function bombAPI() {
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





    $("#info").html("<a href='" + response.results[0].site_detail_url + "'>More Info</a>");



  })
}