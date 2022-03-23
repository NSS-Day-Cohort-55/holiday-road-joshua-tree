import { settings } from "../Settings.js"

export const getWeather = (parkObject) => {
    return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${parseInt(parkObject.latitude)}&lon=${parseInt(parkObject.longitude)}&appid=${settings.weatherKey}&units=imperial`)
    .then(response => response.json())
}
