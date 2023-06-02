import { getWeather } from "./getWeather.js";

import { hasWeather } from "./hasWeather.js";

import { getCity } from "./getCity.js";

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
  });
  // it( 'spy is working', ()=>{
  // expect(spy).toHaveBeenCalled();
  // })

  it("creates markup", () => {
    expect(input).not.toBe(null);
    expect(button).not.toBe(null);
    expect(imgBox).not.toBe(null);

    // expect(newButton).not.toBe(null);

    expect(input.placeholder).toEqual("Введите название города");
  });

  it("adds form and input and button to #container", () => {
    const form1 = el.firstChild;
    const put = form1.firstChild;
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
  });
  /* it ('listener prepends button upon submit',  () =>{
  
const addEvt = new Event ('submit');
form.dispatchEvent(addEvt);
const but = el.weatherBox.firstChild;
 expect (but).not.toEqual(null);
expect (but.tagName).toBe('BUTTON');
}); */
  /*
it ('not more then 10 buttons',()=>{
    getWeather(el)
    function getParagraphs() {
      return [...el.querySelectorAll('.list')].map((newButton) => newButton.innerHTML);
    }
   
    
   const list1 = 'Tula';
  newButton = list1;
  form.dispatchEvent(new Event('submit'))
 button.click();
  const list2 = 'Rostov';
  newButton  = list2;
  form.dispatchEvent(new Event('submit'))
  button.click();
  const list3 = 'Taganrog';
  newButton  = list3;
  form.dispatchEvent(new Event('submit'))
  button.click();
  //let allButtons = el.querySelectorAll('list');
  expect (getParagraphs()).toEqual([list3, list2, list1])

}); */
});
