
// used to retrieve Attraction data from bizarries API
export const getAttractions = () => {
    return fetch(`http://holidayroad.nss.team/bizarreries`)
    .then(response => response.json())
    }
