function citySearch(cityInput) {
  let apiKey = `ae3f019cff78b99c91cc38cabf5b452c`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showWeather);
}

function cityInput(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  citySearch(cityInput.value);
}

citySearch("Toronto");

let searchButton = document.querySelector(".searchButton");
searchButton.addEventListener("click", cityInput);

//Show current day and time
let currentDate = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[currentDate.getDay()];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[currentDate.getMonth()];
let date = currentDate.getDate();
let hours = currentDate.getHours();
let minutes = currentDate.getMinutes();
let currentDateTime = document.querySelector("#current-date-time");
currentDateTime.innerHTML = `Last Updated: ${day}, ${month} ${date} at ${hours}:${minutes}`;

function showWeather(response) {
  let city = response.data.name;
  let cityName = document.querySelector("#current-city");
  cityName.innerHTML = city;

  let description = response.data.weather[0].description;
  let descriptionDisplay = document.querySelector("#description");
  descriptionDisplay.innerHTML = description;

  let temperature = Math.round(response.data.main.temp);
  let tempUpdate = document.querySelector("#current-temp");
  tempUpdate.innerHTML = temperature;

  let feelsLike = Math.round(response.data.main.feels_like);
  let feelTempUpdate = document.querySelector("#feel-temp");
  feelTempUpdate.innerHTML = `Feels like: ${feelsLike}°F`;

  let humidity = Math.round(response.data.main.humidity);
  let humidityUpdate = document.querySelector("#humidity");
  humidityUpdate.innerHTML = `Humidity: ${humidity} %`;

  let wind = Math.round(response.data.wind.speed);
  let windUpdate = document.querySelector("#wind");
  windUpdate.innerHTML = `Wind: ${wind} mph`;

  let iconElement = document.querySelector("#weather-icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

//Use current location button
function displayCurrentLocation(position) {
  let apiKey = `ae3f019cff78b99c91cc38cabf5b452c`;
  let units = `imperial`;
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}

function clickButton(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(displayCurrentLocation);
}

let clickLocation = document.querySelector(".currentLocationButton");
clickLocation.addEventListener("click", clickButton);
