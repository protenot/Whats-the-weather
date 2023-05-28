import { hasWeather } from "./hasWeather.js";
import { getCity } from "./getCity.js";
// import { translit} from "./converter.js"

export async function getLocalWeather(inner) {
  const nameOfLocalCity = document.createElement("p");
  nameOfLocalCity.classList.add("local");
  const place = await getCity();
  nameOfLocalCity.innerText = `Город :  ${place}`;
  console.log(getCity());
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
  /*
   * wrapper.innerHTML = <>
   * <input placeholder="Введите название города"/>
   * <button class = "main-button">Жми сюда </button>
   * </>;
   */
  const form = document.createElement("form");
  wrapper.append(form);
  const input = document.createElement("input");
  input.placeholder = "Введите название города";
  form.append(input);
  const button = document.createElement("button");
  button.innerText = "Жми сюда";
  form.append(button);
  // async function hasWeather(cityName) {
  // const API_KEY = "c768bc4e962d2a69c28ba404045dc96c";
  // const response = await fetch(
  //   `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${cityName}&appid=${API_KEY}`
  // );

  // return response.json();
  // }
  form.addEventListener("submit", async (ev) => {
    ev.preventDefault();
    // const formWeather = ev.target;

    const inputCity = form.querySelector("input");

    let cityName = inputCity.value;
    inputCity.value = "";
    let weather = await hasWeather(cityName);
    const cityN = document.querySelector(".city-name");
    cityN.textContent = weather.name;

    const temperatureData = document.querySelector(".temperature-data");
    temperatureData.textContent = `${Math.round(weather.main.temp)} °C`;
    let iconId = weather.weather[0].icon;
    const avatar = document.querySelector(".avatar");
    avatar.src = `http://openweathermap.org/img/wn/${iconId}@2x.png`;
    const imgBox = document.querySelector(".img-box");
    imgBox.append(avatar);

    const weatherBox = document.querySelector("#weather-box");
    const newButton = document.createElement("button");
    newButton.classList.add("list");
    let { lon } = weather.coord;
    console.log(lon);
    let { lat } = weather.coord;
    console.log(lat);
    const mapContainer = document.querySelector("#map-container");
    const mapFooter = document.createElement("img");
    mapFooter.classList.add("map");

    mapFooter.src = `https://static-maps.yandex.ru/1.x/?ll=${lon},${lat}&size=450,450&z=12&l=map`;

    let allMaps = document.querySelectorAll(".map");
    // mapContainer.append(mapFooter);
    console.log(Object.values(mapContainer));
    if (allMaps.length === 1) {
      // console.log(mapFooter);
      // console.log(mapContainer[0]);
      allMaps[0].remove();
      // console.log(mapFooter)
      mapContainer.append(mapFooter);
    } else {
      mapContainer.append(mapFooter);

      // console.log(mapFooter)}
    }

    if (cityN.textContent) {
      newButton.textContent = cityN.textContent;
      // let array = new Set();
      // array.add(newButton);
      // console.log (array);
      weatherBox.prepend(newButton);
      console.log(weatherBox);
      // const allButtons = Array.from(new Set(weatherBox.querySelectorAll(".list")))
      const allButtons = weatherBox.querySelectorAll(".list");
      // const unique = Array.from(new Set(allButtons));

      console.log(newButton);

      newButton.addEventListener("click", async () => {
        console.log(newButton.textContent);
        cityName = newButton.textContent;
        weather = await hasWeather(cityName);
        cityN.textContent = weather.name;
        console.log(weather.main.temp);
        temperatureData.textContent = `${Math.round(weather.main.temp)} °C`;
        iconId = weather.weather[0].icon;
        avatar.src = `http://openweathermap.org/img/wn/${iconId}@2x.png`;
        lon = weather.coord.lon;
        lat = weather.coord.lat;

        mapFooter.src = `https://static-maps.yandex.ru/1.x/?ll=${lon},${lat}&size=450,450&z=12&l=map`;

        allMaps = document.querySelectorAll(".map");
        console.log(allMaps);
        if (allMaps.length === 1) {
          allMaps[0].remove();

          mapContainer.append(mapFooter);
        } else {
          mapContainer.append(mapFooter);

          // console.log(mapFooter)}
        }
      });

      if (allButtons.length > 10) {
        allButtons[10].remove();
      }
    }

    // const cityOnButton = document.createElement('p')
    // p.innerHTML = cityN.textContent;
    // newButton.append(p);
  });
  //  });
}
