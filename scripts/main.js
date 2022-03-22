import { getParks } from "./parks/ParkDataManager.js";
import { getAttractions } from "./attractions/AttractionDataManager.js";
import { getStates } from "./states/statesDataManager.js";
import { getEateries } from "./eateries/EateryDataManager.js"
import { footer } from "./injectPage/injectFooter.js";
import { header } from "./injectPage/injectHeader.js";
import { makeStatesDropdown } from "./states/statesHTMLgenerator.js"
import { makeParksDropdown } from "./parks/parksHTMLgenerator.js"
import { createTrip } from "./trips/tripsDataManager.js";
import { getWeather } from "./weather/WeatherDataManager.js"

let stateElement = document.querySelector("#state--select")
let parksElement = document.querySelector(".parks--dropdown--container")
let attractionElement = document.querySelector("#attraction--state--select")
let eateriesElement = document.querySelector("#eateries--state--select")

let selectedState = ''
let selectedPark = ''
let selectedAttraction = ''
let selectedEatery = ''

stateElement.addEventListener("change", event => {
    let newParksArray = []
    console.log(event)
    getParks()
    .then(response => {
        for (let item of response.data){
            if (event.target.value === item.states){
                newParksArray.push(item) 
                selectedState = event.target.value
                selectedPark = item
            }
        }
        //make it display nothing until user makes a selection
        parksElement.innerHTML = makeParksDropdown(newParksArray)
    })
    parksElement.addEventListener("click", event => {
        let parkSelection = document.querySelector(".parks--display")
        parkSelection.innerHTML = `<h3>${event.target.value}</h3>
        <button type="button" id="parks--detail--button" class="detail--button">Details Button</button>
        `
        
        //GENERATE PARKS DETAIL BUTTON FUNCTION HERE.
    })
})


attractionElement.addEventListener("change", event => {
    getAttractions().then(response => {
        for (let item of response) {
            if (event.target.value === item.state) {
                document.querySelector(".attractions--display").innerHTML = `
                    <h3> ${item.name} </h3>
                    <button type="button" id="attractions--detail--button" class="detail--button">Details Button</button>
                   `                                
                selectedAttraction = item
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
                    <button type="button" id="eateries--detail--button" class="detail--button">Details Button</button>
                    `                                 
                selectedEatery = item
            }
        }
    })
})

const submitButton = document.querySelector("#submit--button")
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