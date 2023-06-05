import { getWeather } from "./getWeather.js";

import { hasWeather } from "./hasWeather.js";

import { getCity } from "./getCity.js";

const fs = require("fs");

const indexHTML = fs.readFileSync(`${__dirname}/index.html`).toString();

const sleep = (x) =>
  new Promise((resolve) => {
    setTimeout(resolve, x);
  });

describe("getWeather", () => {
  let el;
  let input;
  let button;
  let imgBox;
  let allMaps;
  let newButton;
  let mapContainer;
  let list;
  let cityN;
  let weatherBox;
  let form;
  let mapFooter;
  let lon;
  let lat;
  let arrayNode;
  let city;
  //
  beforeEach(() => {
    document.documentElement.innerHTML = indexHTML;
    // let originalFetch;
    originalFetch = window.fetch;

    el = document.createElement("div");

    getWeather(el);

    input = el.querySelector("input");
    button = el.querySelector("button");
    newButton = el.querySelector(".list");

    form = el.querySelector("form");
    weatherBox = el.querySelector("#weather-box");
    mapContainer = el.querySelector("#map-container");
    allMaps = el.querySelectorAll(".map");
    city = el.querySelector(".city");
    list = el.querySelector(".list");
    mapFooter = el.querySelector(".map");
    lon = el.querySelector("lon");
    lat = el.querySelector("lat");
    arrayNode = el.querySelector("arrayNode");

    window.fetch = jest.fn().mockResolvedValue({
      json: () =>
        Promise.resolve({
          coord: {
            lon,
            lat,
          },
          weather: [
            {
              id: 804,
              main: "Clouds",
              description: "overcast clouds",
              icon: "04d",
            },
          ],

          main: {
            temp: 8.86,
            feels_like: 6.08,
            temp_min: 8.86,
            temp_max: 8.86,
            pressure: 1014,
            humidity: 88,
            sea_level: 1014,
            grnd_level: 988,
          },

          timezone: 10800,
          id: 625144,
          name: input.value,
          cod: 200,
        }),
    });
  });

  afterEach(() => {
    window.fetch = originalFetch;
  });

  // it( 'spy is working', ()=>{
  // expect(spy).toHaveBeenCalled();
  // })

  it("creates markup", () => {
    expect(input).not.toBe(null);
    expect(button).not.toBe(null);
    expect(imgBox).not.toBe(null);

    // expect(newButton).not.toBe(null);

    expect(input.placeholder).toEqual("Введи название города");
  });

  /* it("adds form and input and button to #container", () => {
    const form1 = el.secondChild;
   // const put = form1.secondChild;
    const but = form1.lastChild;
    // const avtr = city.firstChild;
    expect(form1).not.toEqual(null);
    expect(form1.tagName).toBe("FORM");
    expect(put).not.toEqual(null);
    expect(put.tagName).toBe("INPUT");
    expect(but).not.toEqual(null);
    expect(but.tagName).toBe("BUTTON");
    // expect(avtr).not.toEqual(null);
    // expect(avtr.tagName).toBe("P")
  }); */
  it("listener prepends button upon submit", async () => {
    input.value = "Moscow";
    form.submit();
    await sleep(200);
    const but = weatherBox.firstChild;
    // const temp = weatherBox.secondChild;
    expect(but).not.toEqual(null);
    expect(but.tagName).toBe("BUTTON");
    expect(but.textContent).toBe("Moscow");
  });
  it("to see temperature und icon weather when submit", async () => {
    input.value = "Moscow";
    form.submit();
    await sleep(200);
    const temp = el.querySelector(".city-temp");
    const icon = el.querySelector("img");
    expect(temp).not.toEqual(null);
    expect(temp.textContent).toEqual("Температура :  9 °C");
    expect(icon).not.toEqual(null);
  });
  it("after click on button with the name of city to see the weather", async () => {
    const temp = el.querySelector(".city-temp");
    temp.textContent = "Температура :  15 °C";
    const icon = el.querySelector("img");

    button.click();
    await sleep(200);
    cityN = el.querySelector(".city-place");
    expect(cityN).not.toEqual(null);
    cityN.textContent = "Rostov";
    expect(cityN.innerHTML).toBe("Rostov");
    expect(temp.textContent).toEqual("Температура :  15 °C");
    expect(icon).not.toEqual(null);
  });
  it("to see map", async () => {
    // input.value = "Moscow";
    lon = 25.37;
    lat = 56.78;
    form.submit();
    await sleep(200);
    const map = el.querySelector(".map");
    expect(map).not.toEqual(null);
    expect(map.src).toBe(
      "https://static-maps.yandex.ru/1.x/?ll=25.37,56.78&size=450,450&z=12&l=map"
    );
  });

  // })

  it("only unique cities in the container", async () => {
    // function getPar(allButtons) {
    /*  if ([...el.querySelectorAll(".list")].includes(newButton.innerHTML)){
      newButton.remove();
        return [...el.querySelectorAll(".list")].map(
        (newButton) => newButton.innerHTML);
    }
  else{ */
    const allButtons = [...el.querySelectorAll(".list")].map(
      (newButton) => newButton.innerHTML
    );
    //  }
    // return allButtons.length
    // }
    /* arrayNode = Array.from(getParagraphs(), (a) => a.innerText);
     */
    const list1 = "Tula";
    newButton = list1;
    input.value = "Tula";
    form.dispatchEvent(new Event("submit"));
    await sleep(200);

    const list2 = "Tula";
    newButton = list2;
    input.value = "Tula";
    form.dispatchEvent(new Event("submit"));
    await sleep(200);

    const list3 = "Tula";
    newButton = list3;
    input.value = "Tula";
    form.dispatchEvent(new Event("submit"));
    await sleep(200);

    expect(allButtons.textContent).toBe(["Tula"]);
  });

  it("not more then 10 buttons", async () => {
    // getWeather(el)
    function getParagraphs() {
      return [...el.querySelectorAll(".list")].map(
        (newButton) => newButton.innerHTML
      );
    }

    const list1 = "Tula";
    newButton = list1;
    input.value = list1;
    form.dispatchEvent(new Event("submit"));
    await sleep(200);

    const list2 = "Rostov";
    newButton = list2;
    input.value = list2;
    form.dispatchEvent(new Event("submit"));
    await sleep(200);

    const list3 = "Taganrog";
    newButton = list3;
    input.value = list3;
    form.dispatchEvent(new Event("submit"));
    await sleep(200);

    const list4 = "Tumen";
    newButton = list4;
    input.value = list4;
    form.dispatchEvent(new Event("submit"));
    await sleep(200);

    const list5 = "Rome";
    newButton = list5;
    input.value = list5;
    form.dispatchEvent(new Event("submit"));
    await sleep(200);

    const list6 = "Moscow";
    newButton = list6;
    input.value = list6;
    form.dispatchEvent(new Event("submit"));
    await sleep(200);

    const list7 = "Humburg";
    newButton = list7;
    input.value = list7;
    form.dispatchEvent(new Event("submit"));
    await sleep(200);

    const list8 = "Belgrad";
    newButton = list8;
    input.value = list8;
    form.dispatchEvent(new Event("submit"));
    await sleep(200);

    const list9 = "Saratov";
    newButton = list9;
    input.value = list9;
    form.dispatchEvent(new Event("submit"));
    await sleep(200);

    const list10 = "Paris";
    newButton = list10;
    input.value = list10;
    form.dispatchEvent(new Event("submit"));
    await sleep(200);

    const list11 = "Budapesht";
    newButton = list11;
    input.value = list11;
    form.dispatchEvent(new Event("submit"));
    await sleep(200);

    expect(getParagraphs()).toEqual([
      list11,
      list10,
      list9,
      list8,
      list7,
      list6,
      list5,
      list4,
      list3,
      list2,
    ]);
  });

  it("add only one map to container", async () => {
    mapContainer = el.querySelector("#map-container");
    input.value = "Riga";
    lon = 25.37;
    lat = 56.78;

    form.submit();
    await sleep(200);
    // let mapAll =[...el.querySelectorAll('.map')].map();
    // mapAll = el.querySelectorAll('.map');
    lon = 35.37;
    lat = 59.78;

    form.submit();
    await sleep(100);
    // mapAll = el.querySelectorAll('.map');
    lon = 27.37;
    lat = 58.9;

    form.submit();
    await sleep(100);
    // mapAll = el.querySelectorAll('.map');
    expect(mapContainer).not.toBe(null);
    // expect(mapContainer.length).toBe(1);

    expect(mapContainer.innerText).toBe(
      "https://static-maps.yandex.ru/1.x/?ll=25.37,56.78&size=450,450&z=12&l=map"
    );
  });
});
