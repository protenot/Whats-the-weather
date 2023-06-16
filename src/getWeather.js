import { hasWeather } from "./hasWeather.js";
import { getCity } from "./getCity.js";
import { putInLocalStorage } from "./putInLocalStorage.js";

export async function getLocalWeather(inner) {
  const nameOfLocalCity = document.createElement("p");
  nameOfLocalCity.classList.add("local");

  const place = await getCity();

  nameOfLocalCity.innerText = `Город :  ${place}`;
  inner.append(nameOfLocalCity);

  const tempLocal = document.createElement("p");
  tempLocal.classList.add("local");

  const data = await hasWeather(place);

  tempLocal.innerText = `Температура :  ${Math.round(data.main.temp)} °C`;
  inner.append(tempLocal);

  const imgLocal = document.createElement("img");
  imgLocal.classList.add("local");

  const iconLocal = data.weather[0].icon;

  imgLocal.src = `http://openweathermap.org/img/wn/${iconLocal}@2x.png`;
  inner.append(imgLocal);
}

export async function getWeather(wrapper) {
  const form = document.createElement("form");
  wrapper.prepend(form);

  const h2 = document.createElement("h2");
  h2.textContent = "Хочешь узнать погоду?";
  wrapper.prepend(h2);

  const input = document.createElement("input");
  input.placeholder = "Введи название города";
  form.append(input);

  const button = document.createElement("button");
  button.innerText = "Жми сюда";
  form.append(button);

  const city = document.createElement("div");
  city.classList.add("city-name");
  city.textContent = "Город : ";
  wrapper.append(city);

  const cityN = document.createElement("p");
  cityN.classList.add("city-place");
  city.append(cityN);

  const temperatureData = document.createElement("p");
  temperatureData.classList.add("city-temp");
  temperatureData.textContent = "Температура : ";
  wrapper.append(temperatureData);

  const avatar = document.createElement("img");
  avatar.alt = "здесь будет картинка";
  wrapper.append(avatar);

  const h2WeatherBox = document.createElement("h2");

  wrapper.append(h2WeatherBox);

  const weatherBox = document.createElement("div");
  weatherBox.id = "weather-box";
  wrapper.append(weatherBox);

  const h2Map = document.createElement("h2");

  wrapper.append(h2Map);

  const mapContainer = document.createElement("div");
  mapContainer.id = "map-container";
  wrapper.append(mapContainer);

  /* const localPlace = await getCity();
  const dataLocal = await hasWeather(localPlace);
  console.log(dataLocal);
  const lonLocal = dataLocal.coord.lon;

  const latLocal = dataLocal.coord.lat;
  const addressLocal = `https://static-maps.yandex.ru/1.x/?ll=${lonLocal},${latLocal}&size=450,450&z=12&l=map`;

  const temporaryMap = document.createElement("img");
  temporaryMap.classList.add("map");
  temporaryMap.src = addressLocal;
  console.log(temporaryMap);
  mapContainer.append(temporaryMap); */

  form.addEventListener("submit", async (ev) => {
    ev.preventDefault();

    let cityName = input.value;

    putInLocalStorage(cityName);

    let weather = await hasWeather(cityName);

    let iconId = weather.weather[0].icon;

    avatar.src = `http://openweathermap.org/img/wn/${iconId}@2x.png`;

    const cityN = document.createElement("p");

    cityN.textContent = weather.name;

    city.textContent = `Город :  ${cityN.textContent}`;

    temperatureData.textContent = `Температура :  ${Math.round(
      weather.main.temp
    )} °C`;

    const newButton = document.createElement("button");
    newButton.classList.add("list");

    let { lon } = weather.coord;

    let { lat } = weather.coord;

    h2WeatherBox.textContent = "Вы недавно смотрели погоду в городах";

    h2Map.textContent = "Это то, что Вы ищете?";

    const mapFooter = document.createElement("img");
    mapFooter.classList.add("map");
    mapFooter.src = `https://static-maps.yandex.ru/1.x/?ll=${lon},${lat}&size=450,450&z=12&l=map`;

    let allMaps = document.querySelectorAll(".map");

    if (allMaps.length === 1) {
      allMaps[0].remove();

      mapContainer.append(mapFooter);
    } else {
      mapContainer.append(mapFooter);
    }

    if (cityN.textContent) {
      newButton.textContent = cityN.textContent;

      const allButtons = weatherBox.querySelectorAll(".list");

      const arrayNode = Array.from(allButtons, (a) => a.innerText);

      if (
        arrayNode.includes(newButton.innerHTML) &&
        newButton.innerHTML !== arrayNode[9]
      ) {
        console.log(arrayNode);
      } else {
        weatherBox.prepend(newButton);
      }

      if (allButtons.length > 9) {
        allButtons[9].remove();
      }

      input.value = "";
      newButton.addEventListener("click", async () => {
        cityName = newButton.textContent;
        weather = await hasWeather(cityName);
        city.textContent = `Город :  ${cityN.textContent}`;

        temperatureData.textContent = `Температура :  ${Math.round(
          weather.main.temp
        )} °C`;
        iconId = weather.weather[0].icon;
        avatar.src = `http://openweathermap.org/img/wn/${iconId}@2x.png`;
        lon = weather.coord.lon;
        lat = weather.coord.lat;

        mapFooter.src = `https://static-maps.yandex.ru/1.x/?ll=${lon},${lat}&size=450,450&z=12&l=map`;

        allMaps = document.querySelectorAll(".map");

        if (allMaps.length === 1) {
          allMaps[0].remove();

          mapContainer.append(mapFooter);
        } else {
          mapContainer.append(mapFooter);
        }
      });
    }
  });
}
