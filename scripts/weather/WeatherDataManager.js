import { settings } from "../Settings.js"

export const getWeather = (parkObject) => {
    return fetch(`api.openweathermap.org/data/2.5/forecast?lat=${parkObject.latitude}&lon=${parkObject.longitude}&appid=${settings.weatherKey}`)
    .then(response => response)
}