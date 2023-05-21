import { getWeather } from "./getWeather.js";

describe("getWeather", () => {
  let el;
  let input;
  let button;
  beforeEach(() => {
    el = document.createElement("div");
    getWeather(el);

    input = el.querySelector("input");
    button = el.querySelector("button");
  });

  it("creates markup", () => {
    expect(input).not.toBe(null);
    expect(button).not.toBe(null);
  });
});
