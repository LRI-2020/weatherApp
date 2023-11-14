import {GetWeatherByCity, GetWeatherByZipCode, FilterWeathersByDate} from "./weatherManager/weatherManager.js";
import {DisplayMainWeathers, DisplayDetailedWeathers} from "./weatherManager/DisplayWeather.js";
import {addOneDay} from "./helpers.js";

async function GenerateBruxellesWeather() {

    return await GetWeatherByCity("bruxelles").then((r) => {
        
        let mainWeathers = GetMainWeathers(r);
        DisplayMainWeathers(mainWeathers);
        DisplayDetailedWeathers(r);
        return r;
    });
}

function SetFormListener() {
    let cityForm = document.querySelector(".cityForm");

    cityForm.addEventListener('submit', (e) => {

        (async () => {
            e.preventDefault();
            document.querySelector(".allWeather").innerHTML = "";
            document.querySelector(".detailedWeather").innerHTML = "";
            await GetWeather(cityForm);
            // ...
        })();       

    })
}


function SetButtonsListeners() {
    let prev = document.querySelector(".previous")
    prev.addEventListener("click", () => {
        let activeMain = document.querySelector(".currentWeather.active");
        let previousElMain = activeMain.previousSibling;
        let activeDetails = document.querySelector(".details.active");
        let previousElDetails = activeDetails.previousSibling;
        let activeChart = document.querySelector(".tempChart.active");
        let previousChart = activeChart.previousSibling;

        ChangeActive(activeMain, previousElMain,"currentWeather");
        ChangeActive(activeDetails, previousElDetails,"details");
        ChangeActive(activeChart, previousChart,"tempChart");
        
    });

    let next = document.querySelector(".next");

    next.addEventListener("click", () => {
        let activeMain = document.querySelector(".currentWeather.active");
        let nextElMain = activeMain.nextSibling;
        let activeDetails = document.querySelector(".details.active");
        let nextElDetails = activeDetails.nextSibling;
        let activeChart = document.querySelector(".tempChart.active");
        let nextChart = activeChart.nextSibling;

        ChangeActive(activeMain, nextElMain, "currentWeather");
        ChangeActive(activeDetails, nextElDetails,"details");
        ChangeActive(activeChart, nextChart,"tempChart");

    });

}


function ChangeActive(current, sibling, className) {

    if (sibling?.classList?.contains(className)) {
        current.classList.toggle("d-none");
        current.classList.toggle("active");
        sibling.classList.toggle("d-none");
        sibling.classList.toggle("active");
    }
}

async function GetWeather(cityForm) {

    let cityName = cityForm.querySelector("input#cityName").value;
    let zipCode = cityForm.querySelector("input#zipCode").value;
    let select = cityForm.querySelector("select#countries");
    let country = select.value;

    if (cityName !== null && cityName.trim() !== "") {
        return await GetWeatherByCity(cityName).then((r) => {

            let mainWeathers = GetMainWeathers(r);
            DisplayMainWeathers(mainWeathers);  
            DisplayDetailedWeathers(r);
            // DisplayWeatherAllDay(FilterWeathersByDate(r, GetWeathersMinDate(mainWeathers)))
            return r;
        });

    } else if (zipCode !== null && zipCode.trim() !== "" && country !== null && country.trim() !== "") {
        return await GetWeatherByZipCode(zipCode, country).then((r) => {
            let mainWeathers = GetMainWeathers(r);
            DisplayMainWeathers(mainWeathers);
            DisplayDetailedWeathers(r);
            return r;
        });

    } else {
        throw new Error("must enter a city or a zipCode and country")
    }
}

function GetMainWeathers(weathers) {

    let mainWeathers = [];
    let date = new Date(Date.now());
    for (let i = 0; i < 5; i++) {
        let weatherOfTheDate = FilterWeathersByDate(weathers, date.getTime());
        if(i===0){
            mainWeathers.push(weatherOfTheDate[0])
        }
        else{
            mainWeathers.push(weatherOfTheDate[3])
        }
        date = addOneDay(date);
    }

    return mainWeathers;
}

export {GenerateBruxellesWeather, SetFormListener, SetButtonsListeners}
