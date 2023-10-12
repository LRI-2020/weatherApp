﻿class Weather {
    constructor(date, main, description, temp, city, icon,humidity = null, visibility = null, airPressure = null, wind = null) {
        this.date = date;
        this.main = main;
        this.description = description;
        this.temp=temp;
        this.city = city;
        this.humidity=humidity;
        this.visibility=visibility;
        this.airPressure=airPressure;
        this.wind=wind;
        this.icon = icon;
    }
}

export {Weather}