//created this file to make a createTrip function that lets us add our TripObject to the database. 

export const createTrip = (postObj) => {
    return fetch("http://localhost:8088/posts", {
        method: "POST", 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(postObj)     
    })
        .then(response => response.json());
}