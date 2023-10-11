import {GetWeatherByCity, GetWeatherByZipCode, FilterWeathersByDate, GetWeathersMinDate} from "./weatherManager/weatherManager.js";
import {DisplayMainWeathers, DisplayWeatherAllDay} from "./weatherManager/DisplayWeather.js";

async function GenerateBruxellesWeather() {

    return await GetWeatherByCity("bruxelles").then((r) => {
        
        let mainWeathers = GetMainWeathers(r);
        DisplayMainWeathers(mainWeathers);
        DisplayWeatherAllDay(FilterWeathersByDate(r, GetWeathersMinDate(mainWeathers)))
        return r;
    });
}

function SetFormListener() {
    let cityForm = document.querySelector(".cityForm");

    cityForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        document.querySelector(".allWeather").innerHTML = "";
        document.querySelector(".weatherAllDay").innerHTML = "";
        await GetWeather(cityForm);

    })
}


function SetButtonsListeners() {
    let prev = document.querySelector(".previous")
    prev.addEventListener("click", () => {
        let active = document.querySelector(".active");
        let previousEl = active.previousSibling;

        ChangeActive(active, previousEl);
        
    });

    let next = document.querySelector(".next");

    next.addEventListener("click", () => {
        let active = document.querySelector(".active");
        let nextEl = active.nextSibling;

        ChangeActive(active, nextEl);

    });

}


function ChangeActive(current, sibling) {

    if (sibling !== null && sibling.classList !== undefined && sibling.classList.contains("currentWeather")) {
        current.classList.toggle("d-none");
        current.classList.toggle("active");
        sibling.classList.toggle("d-none");
        sibling.classList.toggle("active");
    }
}

async function GetWeather(cityForm) {

    let cityName = cityForm.querySelector("input#cityName").value;
    let zipCode = cityForm.querySelector("input#zipCode").value;
    let country = cityForm.querySelector("input#countryName").value;

    if (cityName !== null && cityName.trim() !== "") {
        return await GetWeatherByCity(cityName).then((r) => {

            let mainWeathers = GetMainWeathers(r);
            DisplayMainWeathers(mainWeathers);
            DisplayWeatherAllDay(FilterWeathersByDate(r, GetWeathersMinDate(mainWeathers)))
            return r;
        });

    } else if (zipCode !== null && zipCode.trim() !== "" && country !== null && country.trim() !== "") {
        return await GetWeatherByZipCode(zipCode, country).then((r) => {
            DisplayMainWeathers(GetMainWeathers(r));
            return r;
        });

    } else {
        throw new Error("must enter a city or a zipCode and country")
    }
}

function GetMainWeathers(weathers) {

    let mainWeathers = [];
    let date = Date.now();
    for (let i = 0; i < 5; i++) {
        mainWeathers.push(FilterWeathersByDate(weathers, date)[0]);
        date = new Date().setDate(new Date(date).getDate()+1);
    }

    return mainWeathers;
}

export {GenerateBruxellesWeather, SetFormListener, SetButtonsListeners}

// let carousel = document.querySelector(".carousel");
// let ctrNext = document.querySelector(".carousel-control-next");
// new bootstrap.Carousel(myCarousel)
//
// ctrNext.addEventListener("click",()=>{
// })