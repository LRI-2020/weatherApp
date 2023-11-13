import {countryCodes} from "../data/countryCodes.js";

function FormatDate(date) {

    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    let day = days[date.getDay()];
    let month = months[date.getMonth()];

    return `${day} ${month}, ${date.getDate()}`;
}

async function GetCountryCode(country) {

    return countryCodes.find(i => i.name.split(" ")[0].toLowerCase() === country.toLowerCase()).code;

}
async function InitializeCountries(){
    let select = document.querySelector("select#countries");
    let countriesNames = countryCodes.map(i => i.name);
    
    countriesNames.forEach((i) => {
        let option = document.createElement("option");
        option.setAttribute("value",i);
        option.innerText=i;
        select.appendChild(option);
    })

    // countries.forEach(i => countriesNames.push(i.name));
}
function DisplayActiveOnly(container){
    let firstItem = container.children.item(0);
    firstItem.classList.remove("d-none");
    firstItem.classList.add("active");
}


function addOneDay(date = new Date()) {
    date.setDate(date.getDate() + 1);

    return date;
}

export{FormatDate, GetCountryCode, addOneDay, InitializeCountries, DisplayActiveOnly}