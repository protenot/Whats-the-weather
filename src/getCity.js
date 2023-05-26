export async function getCity() {
  const responseCity = await fetch("https://get.geojs.io/v1/ip/geo.json");
  const jsonCity = await responseCity.json();
  return jsonCity.city;
}
