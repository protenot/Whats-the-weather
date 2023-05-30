import { getCity } from "./getCity.js";

const fetchMock = require("jest-fetch-mock");

// import fetch from "node-fetch";
describe("getCity", () => {
  it("is a function", () => {
    expect(getCity).toBeInstanceOf(Function);
  });

  it("returns string", async () => {
    // const url = "https://get.geojs.io/v1/ip/geo.json";
    // fetch = jest.fn(() => Promise.resolve());
    // const fetch = (url) => import('node-fetch').then(({default: fetch}) => fetch(url));
    // fetch(url).then(res =>{return res.json()})
    fetchMock.doMock("http://fake.com", { hello: "world" });
    const responseCity = await getCity("http://fake.com");
    const result = await responseCity.json();
    // return await getCity().then(data=>{
    expect(result.hello).toEqual("world");
  });
});
// })
