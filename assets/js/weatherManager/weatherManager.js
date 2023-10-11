import {GetForecastByCity, GetForecastByZipCode, GetOpenForecast} from "../forecastRepository.js";
import {ForecastToWeathers} from "./MapForecastToWeather.js";

//take a openWeather forecast and get the current weather of it
async function GetWeatherByCity(city) {

    let url = GetForecastByCity(city);
    return  await GetOpenForecast(url).then((r) => ForecastToWeathers(r))
}

async function GetWeatherByZipCode(zip, country) {

    let url = await GetForecastByZipCode(zip,country);
    return  await GetOpenForecast(url).then((r) => ForecastToWeathers(r))
}

function GetWeathersMinDate(weathers){

    let res = Number.MAX_VALUE;

    for(let i=0; i<weathers.length;i++){
        if(weathers[i].date.getTime()<res)
            res=weathers[i].date.getTime();

    }

    return res;
}

function GetWeatherAverageHour(weathers){
    
    let dates = [];
    
    weathers.forEach(i => dates.push(i.date.getTime()));
    let average = dates.reduce((a,b) => a+b)/dates.length;
    
    let res;
    
    for(let i=0;i<weathers.length-1;i++) {
        let a = Math.abs(weathers[i].date.getTime() - average);
        let b = Math.abs(weathers[i + 1].date.getTime() - average);
        
        if (a<b)
            res = weathers[i];
        else{
            res= weathers[i+1];
        }
    }
            
    return res;
    
}

//take array of weathers and filter it for one day
//date as timeStamp
function FilterWeathersByDate(weathers, date) {

    // let day = date;
    // day.setHours(0,0,0,0);
    // let nextDay = new Date().setDate(day.getDate() + 1);
    let day = new Date(date);
    day.setHours(0,0,0,0);
    let nextDay = new Date(new Date().setDate(day.getDate()+1));
    nextDay.setHours(0,0,0,0);

    return weathers.filter(i => i.date >= day.getTime() && i.date < nextDay.getTime());
}


export {GetWeatherByCity, GetWeatherByZipCode, FilterWeathersByDate, GetWeathersMinDate, GetWeatherAverageHour}