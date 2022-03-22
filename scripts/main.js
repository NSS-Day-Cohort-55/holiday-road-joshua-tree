import { getParks } from "./parks/ParkDataManager.js";
import { getAttractions } from "./attractions/AttractionDataManager.js";
import { getStates } from "./states/statesDataManager.js";
import { getEateries } from "./eateries/EateryDataManager.js"
import { footer } from "./injectPage/injectFooter.js";
import { header } from "./injectPage/injectHeader.js";
import { makeStatesDropdown } from "./states/statesHTMLgenerator.js"
import { makeParksDropdown } from "./parks/parksHTMLgenerator.js"

import { getWeather } from "./weather/WeatherDataManager.js"
import { createTrip, deleteTrip } from "./trips/tripsDataManager.js"


let stateElement = document.querySelector("#state--select")
let parksElement = document.querySelector(".parks--dropdown--container")
let attractionElement = document.querySelector("#attraction--state--select")
let eateriesElement = document.querySelector("#eateries--state--select")
let weatherElement = document.querySelector(".forecast--trips--container")


let selectedState = ''
let selectedPark = ''
let selectedAttraction = ''
let selectedEatery = ''

let parkButtonBoolean = false;
let attractionButtonBoolean = false;
let eateryButtonBoolean = false;



stateElement.addEventListener("change", event => {
    let newParksArray = []
    getParks()
    .then(response => {
        for (let item of response.data){
            if (event.target.value === item.states){
                newParksArray.push(item) 
                selectedState = event.target.value
                //temp placeholder for selectedEater = item
                selectedPark = item;
                parkButtonBoolean = true;
                checkIfTrue();
                // selectedParkDescription = item.description; //added this to try and store park description.
                
            }
        }
        //make it display nothing until user makes a selection
        parksElement.innerHTML = makeParksDropdown(newParksArray)
    })
    // selectedPark = event.target.value
    //GENERATE PARKS DETAIL BUTTON FUNCTION HERE.
})

parksElement.addEventListener("change", event => {
    let parkSelection = document.querySelector(".parks--display")
    parkSelection.innerHTML = `<h3>${event.target.value}</h3>
    <p id="populate--parks--details"> </p>
    <button type="button" id="parks--detail--button" class="detail--button">Details Button</button>
    `   
}) 

const clearWeather = () => {
    weatherElement.innerHTML = ""
}

//event listener for populating weather
parksElement.addEventListener("change", event =>{
    getWeather(selectedPark)
    .then(response => {
        clearWeather()
        let counter = 1
        for (let item of response.list){
            if(counter < 6){
                weatherElement.innerHTML += `
                <h4>
                Day ${counter}
                </h4>
                <div class="day--forecast--display">
                    Forecast: ${item.weather[0].main}
                    High: ${item.main.temp_max}&deg;F
                    Low: ${item.main.temp_min}&deg;F
                </div>`
                counter++;
            }
        }
    })   
})


attractionElement.addEventListener("change", event => {
    getAttractions().then(response => {
        for (let item of response) {
            if (event.target.value === item.state) {
                document.querySelector(".attractions--display").innerHTML = `
                    <h3> ${item.name} </h3>
                    <p id="populate--attractions--details"> </p>
                    <button type="button" id="attractions--detail--button" class="detail--button">Details Button</button>
                   `                                
                selectedAttraction = item
                attractionButtonBoolean = true;
                checkIfTrue();
            }
        }
    })
})

eateriesElement.addEventListener("change", event => {
    getEateries().then(response => {
        for (let item of response) {
            if (event.target.value === item.state) {
                document.querySelector(".eateries--display").innerHTML = `
                    <h3> ${item.businessName} </h3>
                    <p id="populate--eatery--details"> </p>
                    <button type="button" id="eateries--detail--button" class="detail--button">Details Button</button>
                    `                                 
                    selectedEatery = item;
                    eateryButtonBoolean = true;
                    checkIfTrue();
                
            }
        }
    })
})



const submitButton = document.querySelector("#submit--button")

const checkIfTrue = () => {
    if (parkButtonBoolean === true && attractionButtonBoolean === true && eateryButtonBoolean === true) {
        submitButton.disabled = false;
    }   
}

submitButton.addEventListener("click", event => {
    const state = selectedState
        const park = selectedPark
        const attraction = selectedAttraction
        const eatery = selectedEatery
    
        const tripObject = {
            destState: state,
            park: park,
            attraction: attraction,
            eatery: eatery
        }
        // Call the function that POSTS an object to the Database, and pass in the TripObject. 
        createTrip(tripObject);
    });


// adding event listener to Detail buttons. 
const tripContainerElement = document.querySelector(".trip--preview--container")

tripContainerElement.addEventListener("click", event => {
    let parkSelection = document.querySelector("#populate--parks--details")
    let attractionSelection = document.querySelector("#populate--attractions--details")
    let eaterySelection = document.querySelector("#populate--eatery--details")

    if (event.target.id === "parks--detail--button") {
            parkSelection.innerHTML = `
            Description: ${selectedPark.description}
            `;
        
        //if parkSelection.innerHTML is blank //come back here and do this later!
        
    }
    else if (event.target.id === "attractions--detail--button") {
        attractionSelection.innerHTML = `
        Description: ${selectedAttraction.description}
        
        `;        //add address to line above 
    }
    else if (event.target.id === "eateries--detail--button") {
        eaterySelection.innerHTML = `
        Description: ${selectedEatery.description}
    
        `;    //add amenity stufff to line above 
    }
})



const startPage = () => {
    getStates()
        .then(response => {stateElement.innerHTML = makeStatesDropdown(response)})
    getStates()
        .then(response => {attractionElement.innerHTML = makeStatesDropdown(response)})
    getStates()
        .then(response => {eateriesElement.innerHTML = makeStatesDropdown(response)})
    header()
    footer()
}  

startPage()