let geoCodingHost = "https://api.openweathermap.org/geo/1.0/";
let OpenWeatherHost ="https://api.openweathermap.org/data/2.5/forecast?";
let apiKey = await fetch("./assets/Secrets/secrets.json")
    .then((res) => res.json())
    .then((data) => data.weatherAppApiKey)
    .catch((e) => e);

export{geoCodingHost,OpenWeatherHost,apiKey}