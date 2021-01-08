// JavaScript Document


//leaflet map
	var map = L.map('map').setView([43.1842, 3.0032], 13);

	L.tileLayer.grayscale('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);

	var Icon = L.Icon.extend({
		options: {
			//shadowUrl: 'https://leafletjs.com/examples/custom-icons/leaf-shadow.png',
			iconSize:     [50, 50],
			//shadowSize:   [50, 64],
			//iconAnchor:   [22, 94],
			//shadowAnchor: [4, 62],
			popupAnchor:  [-3, -26]
		}
	});

	var townIcon = new Icon({iconUrl: 'assets/images/town-hall.png'}),
		stadiumIcon = new Icon({iconUrl: 'assets/images/stadium.png'}),
		hospitalIcon = new Icon({iconUrl: 'assets/images/hospital.png'}),
		museumIcon = new Icon({iconUrl: 'assets/images/museum.png'}),
		marketIcon = new Icon({iconUrl: 'assets/images/market.png'});


	L.marker([43.18382, 3.00421], {icon: townIcon}).bindPopup("<a href='https://www.narbonne.fr/'>Centre-ville de Narbonne</a> <br> <img src='https://www.narbonne.fr/sites/default/files/styles/fiche/public/mairie_narbonne0084059_md_0.jpg?itok=ey2jUuqo'/>").addTo(map);
	L.marker([43.18137, 3.01938], {icon: stadiumIcon}).bindPopup("Parc des sports et de l'amitié <br> <img src='https://www.narbonne.fr/sites/default/files/styles/fiche/public/parc-sports.jpg?itok=e4Q9aSaZ' />").addTo(map);
	L.marker([43.18101, 2.99961], {icon: hospitalIcon}).bindPopup("Hôpital de Narbonne <br /> <img src='https://images.lindependant.fr/api/v1/images/view/5fce49f9d286c21a3a089087/large/image.jpg?v=1' />").addTo(map);
	L.marker([43.18118, 3.00512], {icon: marketIcon}).bindPopup("Halles de Narbonne - Marché couvert <br> <img src='https://www.narbonne.fr/sites/default/files/styles/fiche/public/mairie_narbonne0129575md_0.jpg?itok=qkCUmdHZ' />").addTo(map);
	L.marker([43.17986, 3.0148], {icon: museumIcon}).bindPopup("<a href='https://narbovia.fr/'>Musée Narbovia</a> <br> Pour découvrir l'histoire romaine du Narbonnais <br> <img src='https://static.wixstatic.com/media/fbeae1_85d844c89155493f9c06a85a1bc85e59~mv2.jpg/v1/fill/w_684,h_402,al_c,lg_1,q_80/narbo%20via.webp' />").addTo(map);




//météo  
// Tutorial by http://youtube.com/CodeExplained > j'ai rétiré l'auto localisation pour en mettre une fixe


// SELECT ELEMENTS
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");

// App data
const weather = {};

weather.temperature = {
    unit : "celsius"
}

// APP CONSTS AND VARS
const KELVIN = 273;

// GET WEATHER FROM API PROVIDER

    let api = `https://api.openweathermap.org/data/2.5/weather?id=6453642&lang=fr&appid=279757cf0094a3f24d74ec877e0fcaa5`;
    
    fetch(api)
        .then(function(response){
            let data = response.json();
            return data;
        })
        .then(function(data){
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
        })
        .then(function(){
            displayWeather();
        });


// DISPLAY WEATHER TO UI
function displayWeather(){
    iconElement.innerHTML = `<img src="assets/images/icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}

// C to F conversion
function celsiusToFahrenheit(temperature){
    return (temperature * 9/5) + 32;
}

// WHEN THE USER CLICKS ON THE TEMPERATURE ELEMENET
tempElement.addEventListener("click", function(){
    if(weather.temperature.value === undefined) return;
    
    if(weather.temperature.unit == "celsius"){
        let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);
        
        tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
        weather.temperature.unit = "fahrenheit";
    }else{
        tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
        weather.temperature.unit = "celsius"
    }
});



//responsive menu
function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}
