
// used to retrieve Attraction data from bizarries API
export const getAttractions = () => {
    fetch(`http://holidayroad.nss.team/bizarreries`)
    .then(response => response.json())
    .then(parsedResponse => {
        console.log(parsedResponse)
        return parsedResponse
    })
}