//TIME AND DATE
setInterval(() => {
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let date = now.getDate();
  let timeNow = now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  let timeInput = document.querySelector(".time");
  timeInput.innerHTML = `${day} ${date} - <strong> ${timeNow}</strong>`;
}, 1000);

// WEATHER THROUGH GEOLOCATION

function currentPosition(position) {
  console.log(position);
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "caa3ff8c1a9cb6c9d488a903d52ad2dc";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showTemperature);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(currentPosition);
}

let currentButton = document.querySelector("#currentButton");
currentButton.addEventListener("click", getCurrentPosition);

//SEARCH BAR, WEATHER IN REAL TIME

function showTemperature(response) {
  console.log(response);
  let temperature = Math.round(response.data.main.temp);
  let temperatureCity = document.querySelector("#temperature-input");
  temperatureCity.innerHTML = `${temperature}`;

  let cityInput = document.querySelector("#cityinput");
  cityInput.innerHTML = response.data.name;

  let humidity = Math.round(response.data.main.humidity);
  let currentHumidity = document.querySelector(".humidity");
  currentHumidity.innerHTML = `<strong>Humidity: </strong>${humidity}%`;

  let wind = response.data.wind.speed;
  let currentWind = document.querySelector(".wind");
  currentWind.innerHTML = `<strong>Wind: </strong>${wind} m/s`;
}
function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#textinput");

  let cityInput = document.querySelector("#cityinput");
  cityInput.innerHTML = `${searchInput.value}`;

  let apiKey = "caa3ff8c1a9cb6c9d488a903d52ad2dc";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

let searchForm = document.querySelector("#searchform");
searchForm.addEventListener("submit", search);

// TEMPERATURE UNITS

function changeToCelsius() {
  let temperatureInput = document.querySelector("#temperature-input");
  temperatureInput.innerHTML = `19`;
}
function changeToFahrenheit() {
  let temperatureInput2 = document.querySelector("#temperature-input");
  temperatureInput2.innerHTML = `66`;
}
let celsiusInput = document.querySelector("#celsius-input");
celsiusInput.addEventListener("click", changeToCelsius);

let fahrenheitInput = document.querySelector("#fahrenheit-input");
fahrenheitInput.addEventListener("click", changeToFahrenheit);
