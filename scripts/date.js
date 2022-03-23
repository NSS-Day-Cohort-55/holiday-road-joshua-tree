import { getWeather } from "./weather/WeatherDataManager.js"

export const formatDate = (string) => {
    let formattedDate = string.split(" ")[0]
    
    let month = formattedDate.split("-")[1]
    let day = formattedDate.split("-")[2]
    
    return `${month}-${day}`
}



export const renderDate = (arrayObjects) => {
    let newArray = []
    let newDate = arrayObjects[0].dt_txt.split(" ")[0]
    newArray.push(newDate)
    for (let i=0;i<arrayObjects.length;i++){
        if(newDate !== arrayObjects[i].dt_txt.split(" ")[0]){
            newDate = arrayObjects[i].dt_txt.split(" ")[0]
            newArray.push(newDate)
        }
    }
    return newArray
}
