import { getParks } from "./parks/ParkDataManager.js";
import { getAttractions } from "./attractions/AttractionDataManager.js";
import { getStates } from "./states/statesDataManager.js";
import { getEateries } from "./eateries/EateryDataManager.js"
import { footer } from "./injectPage/injectFooter.js";
import { header } from "./injectPage/injectHeader.js";
import { makeStatesDropdown } from "./states/statesHTMLgenerator.js"
import { makeParksDropdown } from "./parks/parksHTMLgenerator.js"

import { makeAttractionsDropdown } from "./attractions/attractionsHTMLgenerator.js"
import { makeEateriesDropdown } from "./eateries/eateryHTMLgenerator.js"


let stateElement = document.querySelector("#state--select")
let parksElement = document.querySelector(".parks--dropdown--container")
let attractionElement = document.querySelector("#attraction--state--select")
let eateriesElement = document.querySelector("#eateries--state--select")

let attractionDropdown = document.querySelector("#attractions--dropdown")
let eateriesDropdown = document.querySelector("#eateries--dropdown")

let selectedState = ''
let selectedPark = ''
let selectedAttraction = ''
let selectedEatery = ''

stateElement.addEventListener("change", event => {
    let newParksArray = []
    getParks()
    .then(response => {
        for (let item of response.data){
            if (event.target.value === item.states){
                newParksArray.push(item)  
                selectedState = event.target.value
            }
        }
        //make it display nothing until user makes a selection
        parksElement.innerHTML = makeParksDropdown(newParksArray)
    })
    parksElement.addEventListener("click", event => {
        let parkSelection = document.querySelector(".parks--display")
        parkSelection.innerHTML = `<p>${event.target.value}</p>`
        selectedPark = event.target.value
    })
})


attractionElement.addEventListener("change", event => {
    getAttractions().then(response => {
        for (let item of response) {
            if (event.target.value === item.state) {
                document.querySelector(".attractions--display").innerHTML = `
                    <p> ${item.name} </p>
                   `
                selectedAttraction = item.name
            }
        }
    })
})

eateriesElement.addEventListener("change", event => {
    getEateries().then(response => {
        for (let item of response) {
            if (event.target.value === item.state) {
                document.querySelector(".eateries--display").innerHTML = `
                    <p> ${item.businessName} </p>
                    `
                selectedEatery = item.businessName
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
    console.log(tripObject)
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

    getAttractions()
        .then(response => {attractionDropdown.innerHTML = makeAttractionsDropdown(response)})
    getEateries()
    .then(response => {eateriesDropdown.innerHTML = makeEateriesDropdown(response)})
}  

startPage()