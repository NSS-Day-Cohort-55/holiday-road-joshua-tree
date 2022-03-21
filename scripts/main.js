import { getParks } from "./parks/ParkDataManager.js";
import { getAttractions } from "./attractions/AttractionDataManager.js";
import { getStates } from "./states/statesDataManager.js";
import { getEateries } from "./eateries/EateryDataManager.js"
import { footer } from "./injectPage/injectFooter.js";
import { header } from "./injectPage/injectHeader.js";
import { makeStatesDropdown } from "./states/statesHTMLgenerator.js"
import { makeParksDropdown } from "./parks/parksHTMLgenerator.js"


let stateElement = document.querySelector("#state--select")
let parksElement = document.querySelector(".parks--dropdown--container")

stateElement.addEventListener("change", event => {
    let newParksArray = []
    getParks()
    .then(response => {
        // console.log(response)
      for (let item of response.data){
        //   console.log(event.target.value)
        //   console.log(item.states)
            if (event.target.value === item.states){
                newParksArray.push(item)            
            }
            // console.log(newParksArray)
            // return newParksArray
        }
        parksElement.innerHTML = makeParksDropdown(newParksArray)
        // startPage()
    })
})



const startPage = () => {
    getStates()
        .then(response => {stateElement.innerHTML = makeStatesDropdown(response)})
    header()
    footer()
} 

startPage()