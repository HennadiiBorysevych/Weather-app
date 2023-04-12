const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const city = document.querySelector(".search-box input");
const error = document.querySelector(".not-found");

search.addEventListener("click", handleWeatherSearch);

function handleWeatherSearch(e) {
  if (!city.value) {
    return;
  }
  dataFetch(city.value)
    .then((data) => {
      handleDataFetch(data);
    })
    .catch((error) => console.log(error));
}

function dataFetch(city) {
  const APIKey = "7bb0cae5a6ba70f85f0b4f88566dbb70";
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
  ).then((res) => {
    try {
      return res.json();
    } catch (error) {
      console.log(error);
    }
  });
}

function handleDataFetch(data) {
  if (data.cod === "404") {
    container.style.height = "400px";
    weatherBox.style.display = "none";
    weatherDetails.style.display = "none";
    error.style.display = "block";
    error.classList.add("fadeIn");
    return;
  }
  error.style.display = "none";
  error.classList.remove("fadeIn");
  const image = document.querySelector(".weather-box img");
  const temperature = document.querySelector(".weather-box .temperature");
  const description = document.querySelector(".weather-box .description");
  const humidity = document.querySelector(".weather-details .humidity span");
  const wind = document.querySelector(".weather-details .wind span");

  switch (data.weather[0].main) {
    case "Clear":
      image.src = "./images/day_clear.svg";
      break;
    case "Rain":
      image.src = "./images/day_rain.svg";
      break;
    case "Snow":
      image.src = "./images/day_snow.svg";
      break;
    case "Clouds":
      image.src = "./images/cloudy.svg";
      break;
    case "Haze":
      image.src = "./images/mist.svg";
      break;

    default:
      image.src = "";
  }
  temperature.innerHTML = `${parseInt(data.main.temp)}<span>°C<span>`;
  description.innerHTML = `${data.weather[0].description}`;
  humidity.innerHTML = `${data.main.humidity}%`;
  wind.innerHTML = `${parseInt(data.wind.speed)}Kh/h`;

  weatherBox.style.display = "";
  weatherDetails.style.display = "";
  weatherBox.classList.add("fadeIn");
  weatherDetails.classList.add("fadeIn");
  container.style.height = "590px";
}
