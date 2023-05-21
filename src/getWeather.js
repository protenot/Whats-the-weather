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
  async function hasWeather(cityName) {
    const API_KEY = "c768bc4e962d2a69c28ba404045dc96c";
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${cityName}&appid=${API_KEY}`
    );

    return response.json();
  }
  form.addEventListener("submit", async (ev) => {
    ev.preventDefault();
    const form = ev.target;
    const input = form.querySelector("input");

    const cityName = input.value;
    input.value = "";
    const weather = await hasWeather(cityName);
    const cityN = document.querySelector(".city-name");
    cityN.textContent = weather.name;
    const temperatureData = document.querySelector(".temperature-data");
    temperatureData.textContent = Math.round(weather.main.temp);
    const iconId = weather.weather[0].icon;
    const avatar = document.querySelector(".avatar");
    avatar.src = `http://openweathermap.org/img/wn/${iconId}@2x.png`;
    const imgBox = document.querySelector(".img-box");
    imgBox.append(avatar);
  });
}
