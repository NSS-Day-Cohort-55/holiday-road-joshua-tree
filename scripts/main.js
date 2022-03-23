import { getParks } from "./parks/ParkDataManager.js";
import { getAttractions } from "./attractions/AttractionDataManager.js";
import { getStates } from "./states/statesDataManager.js";
import { getEateries } from "./eateries/EateryDataManager.js"
import { footer } from "./injectPage/injectFooter.js";
import { header } from "./injectPage/injectHeader.js";
import { makeStatesDropdown } from "./states/statesHTMLgenerator.js"
import { makeParksDropdown } from "./parks/parksHTMLgenerator.js"
import { saveTrip } from "./trips/tripsHTMLGenerator.js";
import { getWeather } from "./weather/WeatherDataManager.js"
import { createTrip, deleteTrip } from "./trips/tripsDataManager.js"
import { formatDate, renderDate } from "./date.js"

let stateElement = document.querySelector("#state--select")
let parksElement = document.querySelector(".parks--dropdown--container")
let attractionElement = document.querySelector("#attraction--state--select")
let eateriesElement = document.querySelector("#eateries--state--select")
let weatherElement = document.querySelector(".forecast--container")
let savedTripElement = document.querySelector(".saved--trips--container")

let selectedState = ''
let selectedPark = ''
let selectedAttraction = ''
let selectedEatery = ''
let savedTripCounter = 0
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
                selectedPark = item;
                parkButtonBoolean = true;
                checkIfTrue();
                
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
    <button type="button" id="parks--detail--button" class="detail--button">Details</button>
    `   
}) 

const clearWeather = () => {
    weatherElement.innerHTML = ""
}



//Rain, Clouds, Clear, Snow
//event listener for populating weather
parksElement.addEventListener("change", event =>{
    getWeather(selectedPark)
    .then(response => {
        clearWeather()
        weatherElement.innerHTML = `<h2>5 Day Forecast</h2>`
        let dateArray = renderDate(response.list)
        let counter = 0
        for (let item of response.list){ 
            if(dateArray[counter] === item.dt_txt.split(" ")[0]) {
                weatherElement.innerHTML += `
                <h4>
                ${formatDate(item.dt_txt)}
                </h4>
                <div class="forecast--display" id="day--forecast--display--${counter}">`
                let weatherIdEl = document.getElementById(`day--forecast--display--${counter}`)
                    if (item.weather[0].main === "Rain"){
                        weatherIdEl.style.backgroundImage = "url('/images/rain.webp')"
                    } else if (item.weather[0].main === "Clouds"){
                        weatherIdEl.style.backgroundImage = "url('/images/cloudy.webp')"
                    } else if (item.weather[0].main === "Clear"){
                        weatherIdEl.style.backgroundImage = "url('/images/sunny.webp')"
                    } else if (item.weather[0].main === "Snow"){
                        weatherIdEl.style.backgroundImage = "url('/images/snow.webp')"
                    }
                  weatherElement.innerHTML +=  `Forecast: ${item.weather[0].main}
                    <br>
                    High: ${item.main.temp_max}&deg;F
                    <br>
                    Low: ${item.main.temp_min}&deg;F
                    <br>
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
                    <button type="button" id="attractions--detail--button" class="detail--button">Details</button>
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
                    <button type="button" id="eateries--detail--button" class="detail--button">Details</button>
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
        console.log(tripObject)
        savedTripCounter++
        savedTripElement.innerHTML += `<h3>Trip ${savedTripCounter}</h3> ${saveTrip(tripObject)}`;
    });


// adding event listener to Detail buttons. 
const tripContainerElement = document.querySelector(".trip--preview--container")

tripContainerElement.addEventListener("click", event => {
    let parkSelection = document.querySelector("#populate--parks--details")
    let attractionSelection = document.querySelector("#populate--attractions--details")
    let eaterySelection = document.querySelector("#populate--eatery--details")

    if (event.target.id === "parks--detail--button") {
        parkSelection.innerHTML = `
        <strong>Description:</strong> ${selectedPark.description}
        `;
    }
    else if (event.target.id === "attractions--detail--button") {
        attractionSelection.innerHTML = `
        <strong>Description:</strong> ${selectedAttraction.description}
        
        `;        //add address to line above 
    }
    else if (event.target.id === "eateries--detail--button") {
        eaterySelection.innerHTML = `
        <strong>Description:</strong> ${selectedEatery.description}
    
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