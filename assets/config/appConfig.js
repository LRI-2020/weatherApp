let geoCodingHost = "https://api.openweathermap.org/geo/1.0/";
let OpenWeatherHost ="https://api.openweathermap.org/data/2.5/forecast?";
let apiKey = import.meta.env.VITE_API_KEY;

function getIconUrl(iconCode,size){
    return `https://openweathermap.org/img/wn/${iconCode}${size}.png`;
}

export{geoCodingHost,OpenWeatherHost,apiKey,getIconUrl}