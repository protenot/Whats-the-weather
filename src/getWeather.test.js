import { getWeather } from "./getWeather.js";
// import { getLocalWeather } from "./getWeather.js";
import { hasWeather } from "./hasWeather.js";

describe("getLocalWeather", () => {
  let element;
  let p;
  let img;
  let place;
  let data;

  const mockObject = {
    id: 1,
    name: 2,
    city: "Moscow",
    organization: 3,
  };
  const mockCity = "Moscow";
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockObject),
    })
  );
  /* describe("fetch finds the right place ", () => {
    beforeEach(async () => {
      place = await getLocalWeather(element);
      let temp = 15;
     // return hasWeather(place).then ()
    });
    

    it("returns right place Moscow", () => {
      expect(place).toEqual(mockCity);
    
  });
  
//it ('calls getCity',()=>{
  //const place = await getCity();
  //expect(fetchMock).toHaveBeenCalled();
}) */

  // const logSpy = jest.spyOn(global.console, "log");
  // let el = document.createElement("div");
  // getLocalWeather(el);
  // expect(  logSpy).toHaveBeenCalled();
  // expect(getCity()).toBeCalled();
});

describe("getWeather", () => {
  let el;
  let input;
  let button;
  let imgBox;
  let newButton;
  let list;
  let cityN;
  let weatherBox;
  let form;
  //
  beforeEach(() => {
    el = document.createElement("div");
    getWeather(el);

    input = el.querySelector("input");
    button = el.querySelector("button");
    // p = el.querySelector("p");
  });

  it("creates markup", () => {
    expect(input).not.toBe(null);
    expect(button).not.toBe(null);
    expect(imgBox).not.toBe(null);
    expect(newButton).not.toBe(null);
    expect(input.placeholder).toEqual("Введите название города");
  });
  /* it ('not more then 10 buttons',()=>{
    getWeather(el)
    function getParagraphs() {
      return [...el.querySelectorAll('.list')].map((button) => button.innerHTML);
    }
    newButton = el.querySelector(".list");
    const value1 = 'Tula';
  newButton.textContent = value1;
  newButton.textContent.dispatchEvent(new Event('input'))
 button.click();
  const value2 = 'Rostov';
  newButton  = value2;
  button.click();
  const value3 = 'Taganrog';
  newButton  = value3;
  button.click();
  let allButtons = el.querySelectorAll('list');
  expect (getParagraphs()).toEqual([value3, value2, value1])



  }) */

  it("adds form and input and button to #container", () => {
    getWeather(el);

    const form1 = el.firstChild;
    const put = form1.firstChild;
    const but = form1.lastChild;
    expect(form1).not.toEqual(null);
    expect(form1.tagName).toBe("FORM");
    expect(put).not.toEqual(null);
    expect(put.tagName).toBe("INPUT");
    expect(but).not.toEqual(null);
    expect(but.tagName).toBe("BUTTON");
  });
  /* it ('listener prepends button upon submit', () =>{
  getWeather(el)
const addEvt = new Event ('input');
el.dispatchEvent(addEvt);
const but = el.weatherBox.firstChild;
expect (but).not.toEqual(null);
expect (but.tagName).toBe('BUTTON');
}); */
});
