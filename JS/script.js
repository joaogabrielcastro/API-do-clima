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
searchBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const city = cityInput.value.trim();

  if (!city) {
    alert("Por favor, digite o nome de uma cidade");
    return;
  }

  await showWeatherData(city);

  weatherContainer.classList.remove("hide");
});

cityInput.addEventListener("keyup", async (e) => {
  if (e.code === "Enter") {
    const city = cityInput.value.trim();

    if (!city) {
      alert("Por favor, digite o nome de uma cidade");
      return;
    }

    await showWeatherData(city);
    weatherContainer.classList.remove("hide");
  }
});

// Funções
const getWeatherData = async (city) => {
  try {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`;

    const res = await fetch(apiUrl);

    if (!res.ok) {
      throw new Error("Cidade não encontrada");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar dados do clima:", error);
    alert("Cidade não encontrada. Tente novamente.");
    return null;
  }
};

const showWeatherData = async (city) => {
  const data = await getWeatherData(city);

  if (!data) return;

  cityElement.innerHTML = data.name;
  tempElement.innerHTML = `${Math.round(data.main.temp)}°C`;
  weatherIconElement.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  countryElement.src = `https://flagsapi.com/${data.sys.country}/flat/32.png`;
  document.querySelector(".description").innerHTML =
    data.weather[0].description;

  // Atualizar mapa se existir
  updateMap(data.name, data.coord.lat, data.coord.lon);
};

// Funções do Mapa
let map;

const initMap = (cityName, lat, lon) => {
  const mapElement = document.getElementById("map");

  if (!mapElement) return;

  // Limpar mapa anterior se existir
  if (map) {
    map.remove();
  }

  // Criar novo mapa
  map = L.map("map").setView([lat, lon], 11);

  // Adicionar tiles do OpenStreetMap
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
  }).addTo(map);

  // Adicionar marcador
  L.marker([lat, lon]).addTo(map).bindPopup(`${cityName}`).openPopup();
};

const updateMap = (cityName, lat, lon) => {
  initMap(cityName, lat, lon);
};
