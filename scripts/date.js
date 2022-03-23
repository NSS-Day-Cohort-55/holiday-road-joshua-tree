import { getWeather } from "./weather/WeatherDataManager.js"

export const formatDate = (string) => {
    let formattedDate = string.split(" ")[0]
    
    let month = formattedDate.split("-")[1]
    let day = formattedDate.split("-")[2]
    
    return `${month}-${day}`
}



export const renderDate = (arrayObjects) => {
    getWeather(arrayObjects)
}