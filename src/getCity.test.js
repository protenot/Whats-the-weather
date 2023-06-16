import { getCity } from "./getCity.js";

describe("getCity", () => {
  it("is a function", () => {
    expect(getCity).toBeInstanceOf(Function);
  });
});
const mockObject = {
  ip: "2001:448a:5061:38bf:152a:be0b:af45:8a42",
  organization_name: "PT Telekomunikasi Indonesia",
  city: "Banjar Danginpangkung",
  asn: 7713,
  organization: "AS7713 PT Telekomunikasi Indonesia",
};
const mockCity = "Banjar Danginpangkung";

beforeEach(() => {
  originalFetch = window.fetch;

  window.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockObject),
    })
  );
});

afterEach(() => {
  window.fetch = originalFetch;
});

describe("fetch", () => {
  let city;
  describe("fetch finds the right place ", () => {
    beforeEach(async () => {
      city = await getCity();
    });

    it("returns right place Banjar Danginpangkung", () => {
      expect(city).toEqual(mockCity);
    });
  });
});
