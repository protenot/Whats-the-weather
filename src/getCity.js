export async function getCity() {
  const responseCity = await fetch("https://get.geojs.io/v1/ip/geo.json");
  console.log(responseCity);

  const jsonCity = await responseCity.json(JSON.stringify());
  // console.log(isJsonString(jsonCity));
  console.log(jsonCity);
  return jsonCity.city;
}
