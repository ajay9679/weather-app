// Tutorial by http://youtube.com/CodeExplained
// api key : 82005d27a116c2880c8f0fcb866998a0

const iconElement = document.querySelector('.weather-icon');
const tempElement = document.querySelector('.temperature-value p');
const descElement = document.querySelector('.temperature-description p');
const locationElement = document.querySelector('.location p');
const notificationElement = document.querySelector('.notification');

const weather = {};
weather.temperature = { unit: 'celsius' };

const KELVIN = 273;
const KEY = '4bad746c7132e9a36f545d98b444b7ef';

if('geolocation' in navigator)
	navigator.geolocation.getCurrentPosition(setPosition, showError);
else{
	notificationElement.style.display = 'block';
	notificationElement.innerHTML = "<p>Browser doesn't support Geolocation</p>";
}
	
function setPosition(position) {
	let { latitude, longitude } = position.coords;
	getWeather(latitude, longitude);
}

function showError(err){
	notificationElement.style.display = 'block';
	notificationElement.innerHTML = `<p>${err.message}</p>`;
}

const getWeather = function(latitude, longitude){
	const api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${KEY}`;
	fetch(api).then(response => data = response.json()).then(data => {
		weather.temperature.value = Math.floor(data.main.temp - KELVIN);
		weather.description = data.weather[0].description;
		weather.iconId = data.weather[0].icon;
		console.log(data);
		weather.city = data.name;
		weather.country = data.sys.country;
	}).then(() => displayWeather());
}

const displayWeather = function(){
	iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
	tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}

const celsiusToFahrenheit = temperature => (temperature * 9/5) + 32;

tempElement.addEventListener('click', function(){
	if(weather.temperature.value === undefined) return;
	if(weather.temperature.unit === 'celsius'){
		let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
		fahrenheit = Math.floor(fahrenheit);
		tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
        weather.temperature.unit = "fahrenheit";
	}else{
        tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
        weather.temperature.unit = "celsius"
    }
});



















