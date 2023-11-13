let geoCodingHost = "https://api.openweathermap.org/geo/1.0/";
let OpenWeatherHost ="https://api.openweathermap.org/data/2.5/forecast?";
let apiKey = process.env.weather_App_Api_Key; 
// await fetch("./assets/Secrets/secrets.json")
//     .then((res) => res.json())
//     .then((data) => data.weatherAppApiKey)
//     .catch((e) => e);

function getIconUrl(iconCode,size){
    return `https://openweathermap.org/img/wn/${iconCode}${size}.png`;
}

export{geoCodingHost,OpenWeatherHost,apiKey,getIconUrl}