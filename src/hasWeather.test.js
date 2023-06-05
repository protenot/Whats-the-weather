import { hasWeather } from "./hasWeather.js";

describe("hasweather", () => {
  it("is a function", () => {
    expect(hasWeather).toBeInstanceOf(Function);
  });
});
const unmockedFetch = global.fetch;

beforeAll(() => {
  global.fetch = () =>
    Promise.resolve({
      json: () => Promise.resolve([]),
    });
});

afterAll(() => {
  global.fetch = unmockedFetch;
});
describe("hasWeather", () => {
  it("works", async () => {
    const json = await hasWeather();
    expect(Array.isArray(json)).toEqual(true);
    expect(json.length).toEqual(0);
  });
});
