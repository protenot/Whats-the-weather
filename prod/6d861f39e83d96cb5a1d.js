import "./style.css";
import { getLocalWeather, getWeather } from "./getWeather.js";
getLocalWeather(document.querySelector("#header-container")),
  getWeather(document.querySelector("#container"));
