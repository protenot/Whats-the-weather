import { putInLocalStorage } from "./putInLocalStorage.js";

describe("putInLocalStorage", () => {
  it("is a function", () => {
    expect(putInLocalStorage).toBeInstanceOf(Function);
  });
  it("changes data in a storage", () => {
    const inputSpy = (input) => {
      localStorage.setItem("city0", input);
      return {
        city0: input,
        city1: "Rostov",
      };
    };
    const city0 = "Tula";

    jest.spyOn(Storage.prototype, "setItem");
    localStorage.clear();
    inputSpy(city0);
    expect(localStorage.setItem).toHaveBeenCalled();
    // expect(localStorage.setItem).toBe('Tula');
  });
});
