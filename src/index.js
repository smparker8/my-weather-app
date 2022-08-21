//Search button
function citySearch(cityInput) {
  let apiKey = `ae3f019cff78b99c91cc38cabf5b452c`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function cityInput(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  citySearch(cityInput.value);
}

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

//Function for overwriting HTML for daily forecast
function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row row-cols-5">`;

  let days = ["Friday", "Saturday", "Sunday"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `          <div class="col">
                    <div class="card mx-auto fiveDayCard">
                        <div class="card-body align-items-center d-flex justify-content-center flex-column fiveDayCardBody">
                            <h5 class="card-title forecast-day">${day}</h5>
                            <i class="fa-solid fa-wind mx-auto futureFridayEmoji"></i>
                            <p class="forecast-temp">
                                <span class="forecast-temp-high">
                                    53° </span>
                                <span class="forecast-temp-low">
                                    36°
                                </span>
                            </p>
                        </div>
                    </div>
                </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//Function to display all weather properties from API and overwrite HTML
function showWeather(response) {
  let city = response.data.name;
  let cityName = document.querySelector("#current-city");
  cityName.innerHTML = city;

  let description = response.data.weather[0].description;
  let descriptionDisplay = document.querySelector("#description");
  descriptionDisplay.innerHTML = description;

  let temperature = Math.round(celsiusTemp);
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

  //Change the weather emoji icon with API weather description data
  let iconElement = document.querySelector("#weather-icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  celsiusTemp = response.data.main.temp;
}

//Use current location button
function displayCurrentLocation(position) {
  let apiKey = `ae3f019cff78b99c91cc38cabf5b452c`;
  let units = `metric`;
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}

//Location Button function using geolocation navigator
function clickButton(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(displayCurrentLocation);
}

let clickLocation = document.querySelector(".currentLocationButton");
clickLocation.addEventListener("click", clickButton);

//Toggle between C and F temperature readings
function displayFarenheitTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp");
  let farenheitTemp = (celsiusTemp * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(farenheitTemp);
}

function displayCelsiusTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
}

let celsiusTemp = null;

let farenheitLink = document.querySelector("#flink");
farenheitLink.addEventListener("click", displayFarenheitTemp);

let celsiusLink = document.querySelector("#clink");
celsiusLink.addEventListener("click", displayCelsiusTemp);

//Calling functions from above
citySearch("Toronto");
displayForecast();
