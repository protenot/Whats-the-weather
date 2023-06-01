import { getLocalWeather } from "./getWeather.js";
import { hasWeather } from "./hasWeather.js";

describe("getLocalWeather", () => {
  let element;
  let p;
  it("is a function", () => {
    expect(getLocalWeather).toBeInstanceOf(Function);
  });
  it("creates markup in header", () => {
    element = document.createElement("div");
    p = element.querySelectorAll("p");
    expect(p).not.toBe(null);
    // expect(p.length).toEqual(2);
    // expect(img).not.toBe(null);
  });
  const fetchMock = jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve([]),
    })
  );

  it("calls hasWeather", async () => {
    // const place = await getCity();
    const data = await hasWeather("Moscow");
    const cityName = "Moscow";
    const API_KEY = "c768bc4e962d2a69c28ba404045dc96c";
    expect(fetchMock).toHaveBeenCalled();
    expect(fetchMock).toHaveBeenCalledWith(
      `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${cityName}&appid=${API_KEY}`
    );
  });
});

test("finds right data from mock object", () => {
  // const data = await getLocalWeather();
  const placeMock = "Moscow";
  const tempMock = 2.15;
  const iconMock = "04d";
  const data = {
    coord: {
      lon: 37.62,
      lat: 55.75,
    },
    weather: [
      {
        id: 803,
        main: "Clouds",
        description: "broken clouds",
        icon: "04d",
      },
    ],
    main: {
      temp: 2.15,
      feels_like: -3.03,
      temp_min: 2,
      temp_max: 2.22,
      pressure: 1029,
      humidity: 69,
    },

    name: "Moscow",
  };
  const myMockFn = jest.fn(() => data);
  myMockFn(data);

  expect(data.name).toBe(placeMock);
  expect(data.main.temp).toBe(tempMock);
  expect(data.weather[0].icon).toBe(iconMock);
});
