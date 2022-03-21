
//used to revieve state data from local .json api 
export const getStates = () => {
   return fetch(`http://localhost:8088/states`)
    .then(response => response.json())
    .then(parsedResponse => {
        return parsedResponse
        
    })
}