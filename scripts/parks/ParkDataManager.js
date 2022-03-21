

//Used to retrieve National Parks data from API
export const getParks = () => {
    return fetch(`https://developer.nps.gov/api/v1/parks?api_key=pqyN4FMCqAwMm6pCPoWL6YcGuf7rfI6ecDeVrSku&limit=465`)
    .then(response => response.json())
}

