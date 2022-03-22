import { settings } from "../Settings.js"


//Used to retrieve National Parks data from API
export const getParks = () => {
    return fetch(`https://developer.nps.gov/api/v1/parks?api_key=${settings.npsKey}&limit=465`)
    .then(response => response.json())
}

