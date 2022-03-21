import { getParks } from "./parks/ParkDataManager.js";
import { getAttractions } from "./attractions/AttractionDataManager.js";
import { getStates } from "./states/statesDataManager.js";
import { getEateries } from "./eateries/EateryDataManager.js"
import { footer } from "./injectPage/injectFooter.js";
import { header } from "./injectPage/injectHeader.js";
import { makeStatesDropdown } from "./states/statesHTMLgenerator.js"
import { makeParksDropdown } from "./parks/parksHTMLgenerator.js"

//get access to the elements on the DOM
let stateElement = document.querySelector("#state--select")
let parksElement = document.querySelector(".parks--dropdown--container")
let attractionElement = document.querySelector("#attraction--state--select")
let eateriesElement = document.querySelector("#eateries--state--select")


//when the state select box changes...
stateElement.addEventListener("change", event => {
    let newParksArray = []
    getParks()  //returns an object that has a data property that contains the 465 arrays (parks).
    .then(response => {
        for (let item of response.data){
            if (event.target.value === item.states){
                newParksArray.push(item)            
            }
        }
        //make the parksDropdown with the filtered NewParksArray
        parksElement.innerHTML = makeParksDropdown(newParksArray)
        document.querySelector(".parks--display").innerHTML = `
            <p></p>
            ` //we will need to change above lines to trip preview class, but also how are we identifying the value?
    })
})



attractionElement.addEventListener("change", event => {
    getAttractions().then(response => {
        for (let item of response) {
            if (event.target.value === item.state) {
                document.querySelector(".attractions--display").innerHTML = `
                    <p> ${item.name} </p>
                    `
            }
        }
    })
})

eateriesElement.addEventListener("change", event => {
    getEateries().then(response => {
        for (let item of response) {
            if (event.target.value === item.state) {  //just need to switch line 53 to the trip preview eatery sections class. 
                document.querySelector(".eateries--display").innerHTML = ` 
                    <p> ${item.businessName} </p>
                    `
            }
        }
    })
})


const startPage = () => {
    //inject the 3 state dropdown lists onto the DOM;
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