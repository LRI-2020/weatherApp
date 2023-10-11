import {Coordinates} from "./coordinates.js";
import {geoCodingHost, apiKey} from "../config/appConfig.js";

async function GetCoordinatesByCityName(cityName) {
    let url = geoCodingHost + `direct?q=${cityName}&appid=${apiKey}`;
    let response = await GetCoordinates(url);
    return new Coordinates(response[0].lat, response[0].lon);
}

async function GetCoordinatesByZipCode(postCode, country) {
    let countryCode = await GetCountryCode(country);

    // TODO validate postCode name here
    let url = geoCodingHost + `zip?zip=${postCode},${countryCode}&appid=${apiKey}`;

    let response = await GetCoordinates(url);
    return new Coordinates(response.lat, response.lon);

}



function GetCoordinates(url) {

    return fetch(url).then((res) => res.json())
        .catch((e) => e);
}

