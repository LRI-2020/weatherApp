import {OpenWeatherHost, apiKey} from "../config/appConfig.js";
import {GetCountryCode} from "./helpers.js";

//Get open weather forecast based on city name

function GetForecastByCity(city) {
    return OpenWeatherHost + `q=${city}&appid=${apiKey}&units=metric`;

}

//Get open weather forecast based on zip code and country code
async function GetForecastByZipCode(zip, country) {
    return await GetCountryCode(country).then((r) => OpenWeatherHost + 
        `zip=${zip},${r}&appid=${apiKey}&units=metric`);
}

//Get open weather forecast based on url
async function GetOpenForecast(url) {
    return await fetch(url)
        .then((res) => res.json())
        .catch((e) => e);
}

export {GetForecastByCity, GetForecastByZipCode, GetOpenForecast}
