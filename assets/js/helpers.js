
function FormatDate(date) {

    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    let day = days[date.getDay()];
    let month = months[date.getMonth()];

    return `${day} ${month}, ${date.getDate()}`;
}

async function GetCountryCode(country) {
    let countries = await fetch("./assets/data/countryCodes.json").then((res) => res.json());

    return countries.find(i => i.name.split(" ")[0].toLowerCase() === country.toLowerCase()).code;

}

export{FormatDate, GetCountryCode}