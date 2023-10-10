import{Coordinates} from "./coordinates.js";


document.querySelector(".cityForm").addEventListener('submit', async function(e){
   e.preventDefault();
   let coord;
   
    let cityName = document.querySelector("input#cityName").value;
    let zipCode = document.querySelector("input#zipCode").value;
    let country = document.querySelector("input#countryName").value;
    if(cityName !== null && cityName.trim() !== ""){
        coord = await GetCoordinatesByCityName(cityName);
    }
    else if(zipCode !== null && zipCode.trim() !== "" && country !== null && country.trim() !== ""){
        coord = await GetCoordinatesByZipCode(zipCode,country);
    }
    else{
        throw new Error("must enter a city or a zipCode and country")
    }

        //TODO validate form
    console.log(coord);

})


let geocodingHost = await fetch("./assets/config/appConfig.json")
    .then((res) => res.json())
    .then((data) => data.GeoCodingHost)
    .catch((e) => e);

let apiKey = await fetch("./assets/Secrets/secrets.json")
    .then((res) => res.json())
    .then((data) => data.weatherAppApiKey)
    .catch((e) => e);

async function  GetCoordinatesByCityName(cityName){
let url = geocodingHost+`direct?q=${cityName}&appid=${apiKey}`;
let response = await GetCoordinates(url);
   return new Coordinates(response[0].lat,response[0].lon);
}

async function GetCoordinatesByZipCode(postCode,country){
    let countryCode = await GetCountryCode(country);

    // TODO validate postCode name here
    let url = geocodingHost+`zip?zip=${postCode},${countryCode}&appid=${apiKey}`;

    let response = await GetCoordinates(url);
    return new Coordinates(response.lat,response.lon);
    
}

async function GetCountryCode(country){
    let countries = await fetch("./assets/data/countryCodes.json").then((res) => res.json());
    
    return countries.find(i => i.name.split(" ")[0].toLowerCase() === country.toLowerCase()).code;
    
}

function GetCoordinates(url){

    return fetch(url).then((res) => res.json())
        .then((data) => data)
        .catch((e) => e);
}