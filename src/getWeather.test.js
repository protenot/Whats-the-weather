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
  let place;
  let newButton;
  let cityN;
  let list;
  let city;
  let weatherBox;
  let form;
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
    // newButton.textContent = '';
    form = el.querySelector("form");
    weatherBox = el.querySelector("#weather-box");
    city = el.querySelector(".city");
    list = el.querySelector(".list");
    // const spy =jest.spyOn(getCity, 'city')
    // const spyWorking = getCity.city();
    // .mockReturnValue('Moscow');
    // jest.spyOn(hasWeather, 'pogoda').mockReturnValue(15);
    window.fetch = jest.fn().mockResolvedValue({
      json: () =>
        Promise.resolve({
          coord: {
            lon: 27.5667,
            lat: 53.9,
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
    expect(but).not.toEqual(null);
    expect(but.tagName).toBe("BUTTON");
    expect(but.textContent).toBe("Moscow");
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
    // let allButtons = el.querySelectorAll('list');
    expect(getParagraphs()).toEqual([list3, list2, list1]);
  });
});
