import {Weather} from "./weather.js";

//take a openWeather forecast and parse it to weathers object
function ForecastToWeathers(forecast) {

    let weatherBy3Hours = [];

    for (let weather of forecast.list) {

        weatherBy3Hours.push(ForecastToWeather(forecast, forecast.list.indexOf(weather)))
    }

    return weatherBy3Hours;

}

//take an openWeather forecast and an index of a specific  and get the current Weather of it
function ForecastToWeather(forecast, i) {

    let currentForecast = forecast.list[i];
    let currentWeather = new Weather(
        (new Date(currentForecast.dt * 1000)),
        currentForecast.weather[0].main,
        currentForecast.weather[0].description,
        currentForecast.main.temp,
        forecast.city.name,
        currentForecast.weather[0].icon,
        currentForecast.main.humidity,
        currentForecast.visibility,
        currentForecast.main.pressure,
        currentForecast.wind.speed
    );

    return currentWeather;
}

export {ForecastToWeathers}