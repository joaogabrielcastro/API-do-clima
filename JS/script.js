// Variaveis e seleção de elementos
const apiKey = "2caefbb54e101fa03849d72535dc3464";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

const cityInput = document.querySelector("#city_input");
const searchBtn = document.querySelector(".search");

const cityElement = document.querySelector("#city_name");
const countryElement = document.querySelector("#country");
const tempElement = document.querySelector("#temperature");
const weatherIconElement = document.querySelector("#weather-icon");

const weatherContainer = document.querySelector("#weather-data");

// Eventos

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const city = cityInput.value;

  showWeatherData(city);

  weatherContainer.classList.remove("hide");
});

cityInput.addEventListener("keyup", (e) => {
  if (e.code === "Enter") {
    const city = cityInput.value;
    showWeatherData(city);
  }
});

// Funções
const getWeatherData = async (city) => {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`;

  const res = await fetch(apiUrl);
  const data = await res.json();

  return data;
};

const showWeatherData = async (city) => {
  const data = await getWeatherData(city);

  cityElement.innerHTML = data.name;
  tempElement.innerHTML = `${Math.round(data.main.temp)}°C`;
  weatherIconElement.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
  countryElement.src = `https://flagsapi.com/${data.sys.country}/flat/32.png`;
  document.querySelector(".description").innerHTML =
    data.weather[0].description;
};
