import { getLocalWeather } from "./getWeather.js";

beforeEach(() => {
  const placeMock = "Moscow";

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
    base: "stations",
    main: {
      temp: 2.15,
      feels_like: -3.03,
      temp_min: 2,
      temp_max: 2.22,
      pressure: 1029,
      humidity: 69,
    },
    visibility: 10000,
    wind: {
      speed: 4,
      deg: 310,
    },
    clouds: {
      all: 75,
    },
    dt: 1605098072,
    sys: {
      type: 1,
      id: 9029,
      country: "RU",
      sunrise: 1605070630,
      sunset: 1605101407,
    },
    timezone: 10800,
    id: 524901,
    name: "Moscow",
    cod: 200,
  };
  const myMockFn = jest.fn((cb) => cb(data));
  // return hasWeather(place).then ()
});
describe("getLocalWeather", () => {
  it("is a function", () => {
    expect(getLocalWeather).toBeInstanceOf(Function);
  });
});
test("something", () => {
  // const data = await getLocalWeather();

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
    base: "stations",
    main: {
      temp: 2.15,
      feels_like: -3.03,
      temp_min: 2,
      temp_max: 2.22,
      pressure: 1029,
      humidity: 69,
    },
    visibility: 10000,
    wind: {
      speed: 4,
      deg: 310,
    },
    clouds: {
      all: 75,
    },
    dt: 1605098072,
    sys: {
      type: 1,
      id: 9029,
      country: "RU",
      sunrise: 1605070630,
      sunset: 1605101407,
    },
    timezone: 10800,
    id: 524901,
    name: "Moscow",
    cod: 200,
  };
  const myMockFn = jest.fn((cb) => cb(data));
  myMockFn(data);
  //  return getLocalWeather().then(data=>{
  expect(myMockFn(data)).toBe("Moscow");
});
