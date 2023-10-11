import {mainWeatherTemp} from "../hmlTemplates.js";
import{FormatDate} from "../helpers.js";

function DisplayMainWeathers(MainWeathers) {

    // let carousel = document.querySelector(".carousel-inner");

    let container = document.querySelector(".allWeather");


    for (let currentWeather of MainWeathers) {

        let weatherElement = document.createElement('div');
        weatherElement.classList.add("currentWeather", "d-none","col","mx-auto");
        weatherElement.innerHTML = mainWeatherTemp;


        let city = weatherElement.querySelector(".nowCity");
        city.innerText = currentWeather.city;

        let dateElement = weatherElement.querySelector(".nowDate");
        dateElement.innerText = FormatDate(currentWeather.date);

        let tempElement = weatherElement.querySelector(".nowTemp");
        tempElement.innerText = `${currentWeather.temp} °C`;

        let description = weatherElement.querySelector(".nowDescription");
        description.innerText = currentWeather.description;

        let humidity = weatherElement.querySelector(".nowHumidityValue");
        humidity.innerText = `${currentWeather.humidity}%`;

        let visibility = weatherElement.querySelector(".nowVisibilityValue");
        visibility.innerText = `${currentWeather.visibility / 1000}KM`;

        let air = weatherElement.querySelector(".nowAirValue");
        air.innerText = `${currentWeather.airPressure} hPa`;

        let wind = weatherElement.querySelector(".nowWindValue");
        wind.innerText = `${currentWeather.wind} mph`;

        // let div = carousel.children.item(MainWeathers.indexOf(currentWeather));
        // div.append(weatherElement);

        container.appendChild(weatherElement);
        let firstItem = container.children.item(0);
        firstItem.classList.remove("d-none");
        firstItem.classList.add("active");

    }


}

function DisplayBy3Hours(weather) {

    let card = document.createElement('div');
    card.classList.add("card", "col", "mx-1", "weather3Hours", "text-center");
    card.innerHTML = `<div class="card-header">
                         <p class="hour"> Hour </p>
                      </div>
                        <div class="card-body">
                            <p class="description"> Description </p>
                        </div>
                        <div class="card-footer weatherMain">
                            <p class="temp"> Temp </p>
                        </div>`

    card.querySelector(".hour").innerText = `${weather.date.getHours()}:${weather.date.getMinutes()}`;
    card.querySelector(".description").innerText = weather.description;
    card.querySelector(".temp").innerText = `${weather.temp}°`;

    document.querySelector(".weatherAllDay").appendChild(card);

}

function DisplayWeatherAllDay(weathers) {

    for (let weather of weathers) {

        DisplayBy3Hours(weather);
    }
}

export{DisplayMainWeathers, DisplayWeatherAllDay}