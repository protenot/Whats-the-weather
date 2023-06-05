import "./style.css";
import { getLocalWeather, getWeather } from "./getWeather.js";

getLocalWeather(document.querySelector("#header-container"));
// import { getWeather } from "./getWeather.js";

getWeather(document.querySelector("#container"));
