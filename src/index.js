//Search button
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

let searchButton = document.querySelector(".searchButton");
searchButton.addEventListener("click", cityInput);

//Display current day and time
function formatDate(timestamp) {
  let currentDate = new Date(timestamp);
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
  return `Last Updated: ${day}, ${month} ${date} at ${formatTime(timestamp)}`;
}

//Function to format hours into Standard Time
function formatTime(timestamp) {
  let date = new Date(timestamp);
  let hour = date.getHours();
  let minutes = date.getMinutes();
  let time = `AM`;
  if (hour > 12) {
    time = `pm`;
    hour = hour - 12;
  } else {
    time = `am`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hour}:${minutes}${time}`;
}

//Function to format days in 5-day forecast
function formatForescastDays(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}

//Function for overwriting HTML for daily forecast
function displayForecast(response) {
  let dailyForecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row row-cols-5">`;

  dailyForecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `          <div class="col">
                    <div class="card mx-auto forecast-card">
                        <div class="card-body align-items-center d-flex justify-content-center flex-column forecast-card-body">
                            <h5 class="card-title forecast-day">${formatForescastDays(
                              forecastDay.dt
                            )}</h5>
                           <img src="http://openweathermap.org/img/wn/${
                             forecastDay.weather[0].icon
                           }@2x.png"
                           alt="weather-icon" />
                            <p class="forecast-temp">
                                <span class="forecast-temp-high">
                                   ${Math.round(forecastDay.temp.max)}° </span>
                                <span class="forecast-temp-low">
                                    ${Math.round(forecastDay.temp.min)}° 
                                </span>
                            </p>
                        </div>
                    </div>
                </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//Function to Display Forecast data based on coordinates of city input
function pullForecast(coordinates) {
  let apiKey = `ae3f019cff78b99c91cc38cabf5b452c`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

//Function to display all weather properties from API and overwrite HTML
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

  let lastUpdate = document.querySelector("#current-date-time");
  lastUpdate.innerHTML = formatDate(response.data.dt * 1000);
  console.log(response.data.dt);

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

  pullForecast(response.data.coord);
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

//Location Button function using geolocation navigator
function clickButton(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(displayCurrentLocation);
}

let clickLocation = document.querySelector(".currentLocationButton");
clickLocation.addEventListener("click", clickButton);

//Calling functions from above
citySearch("Toronto");
