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
                
            }
        }
        parksElement.innerHTML = makeParksDropdown(newParksArray)
    })
    // selectedPark = event.target.value
    //GENERATE PARKS DETAIL BUTTON FUNCTION HERE.
})

parksElement.addEventListener("change", event => {
    let parkSelection = document.querySelector(".parks--display")
    getParks()
    .then(response => {
        for (let item of response.data) {
            if (event.target.value === item.fullName) {
                parkSelection.innerHTML = `
                <h3>${event.target.value}</h3>
                <p id="populate--parks--details"> </p>
                <div id="parks--detail--button--div">
                    <button type="button" id="parks--detail--button" class="detail--button">Details</button>
                </div>
                `   
                selectedPark = item;
                parkButtonBoolean = true;
                checkIfTrue();
                
                //getting weather
                getWeather(selectedPark)
                .then(response => {
                    clearWeather()
                    weatherElement.innerHTML = `<h2>5 Day Forecast</h2>`
                    let dateArray = renderDate(response.list)
                    let counter = 0
                    for (let item of response.list){ 
                        if(dateArray[counter] === item.dt_txt.split(" ")[0] && counter<5) {
                            weatherElement.innerHTML += `
                            <h4 style="margin-top: 1em">
                            ${formatDate(item.dt_txt)}
                            </h4>
                            <div class="forecast--display" id="day--forecast--display--${counter}">`
                            let weatherIdEl = document.getElementById(`day--forecast--display--${counter}`)
                                if (item.weather[0].main === "Rain"){
                                    weatherIdEl.style.backgroundImage = `linear-gradient(
                                        rgba(0, 0, 0, 0.2),
                                        rgba(0, 0, 0, 0.2)
                                      ), url('/images/rain.webp')`
                                } else if (item.weather[0].main === "Clouds"){
                                    weatherIdEl.style.backgroundImage = `linear-gradient(
                                        rgba(0, 0, 0, 0.2),
                                        rgba(0, 0, 0, 0.2)
                                      ), url('/images/cloudy.webp')`
                                } else if (item.weather[0].main === "Clear"){
                                    weatherIdEl.style.backgroundImage = `linear-gradient(
                                        rgba(0, 0, 0, 0.2),
                                        rgba(0, 0, 0, 0.2)
                                      ), url('/images/sunny.webp')`
                                } else if (item.weather[0].main === "Snow"){
                                    weatherIdEl.style.backgroundImage = `linear-gradient(
                                        rgba(0, 0, 0, 0.2),
                                        rgba(0, 0, 0, 0.2)
                                      ), url('/images/snow.webp')`
                                }
                              document.querySelector(`#day--forecast--display--${counter}`).innerHTML+= `<p>Forecast: ${item.weather[0].main}</p>
                                
                                <p>High: ${item.main.temp_max}&deg;F</p>
                                
                                <p>Low: ${item.main.temp_min}&deg;F</p>
                                
                            </div>`
                            counter++;
                        }
                    }
                })   
            }
        }

    })
}) 

const clearWeather = () => {
    weatherElement.innerHTML = ""
}

attractionElement.addEventListener("change", event => {
    getAttractions().then(response => {
        for (let item of response) {
            if (event.target.value === item.state) {
                document.querySelector(".attractions--display").innerHTML = `
                    <h3> ${item.name} </h3>
                    <p id="populate--attractions--details"> </p>
                    <div id="attractions--detail--button--div">
                        <button type="button" id="attractions--detail--button" class="detail--button">Details</button>
                    </div>
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
                    <div id="eateries--detail--button--div">
                        <button type="button" id="eateries--detail--button" class="detail--button">Details</button>
                    </div>
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
        savedTripCounter++
        document.querySelector("#saved--trips--title").innerHTML = `Saved Trips`
        savedTripElement.innerHTML += `<h3>Trip ${savedTripCounter}</h3> ${saveTrip(tripObject)}`;
    });


// adding event listener to Detail buttons. 
const tripContainerElement = document.querySelector(".trip--preview--container")

tripContainerElement.addEventListener("click", event => {
    let parkSelection = document.querySelector("#populate--parks--details")
    let attractionSelection = document.querySelector("#populate--attractions--details")
    let eaterySelection = document.querySelector("#populate--eatery--details")

    if (event.target.id === "parks--detail--button") {
        document.querySelector("#parks--detail--button--div").innerHTML = ""
        parkSelection.innerHTML = `
        <strong>Address:</strong> ${selectedPark.addresses[0].line1}, ${selectedPark.addresses[0].city}, ${selectedPark.addresses[0].stateCode} ${selectedPark.addresses[0].postalCode}
        <br>
        <strong>Website:</strong> <a href="${selectedPark.url}" target="_blank">Click Here</a>
        <br>
        <strong>Description:</strong> ${selectedPark.description}
        `;
    }
    
    else if (event.target.id === "attractions--detail--button") {
        document.querySelector("#attractions--detail--button--div").innerHTML = ""
        attractionSelection.innerHTML = `
        <strong>City:</strong> ${selectedAttraction.city}
        <br>
        `
        if (selectedAttraction.ameneties.restrooms === true) {
            attractionSelection.innerHTML += `
            <strong>Restrooms:</strong> &#128077;
            <br>
            `
        }
        else if (selectedAttraction.ameneties.restrooms === false) {
            attractionSelection.innerHTML += `
            <strong>Restrooms:</strong> &#x1F44E;
            <br>
            `
        }
        attractionSelection.innerHTML += `
        <strong>Description:</strong> ${selectedAttraction.description}
        `
        
                //add address to line above 
    }
    
    else if (event.target.id === "eateries--detail--button") {
        document.querySelector("#eateries--detail--button--div").innerHTML = ""
        eaterySelection.innerHTML = `
        <strong>City:</strong> ${selectedEatery.city}
        <br>
        `
        if (selectedEatery.ameneties.wifi === true) {
            eaterySelection.innerHTML += `
            <strong>Wifi:</strong> &#128077;
            <br>
            `
        }
        else if (selectedEatery.ameneties.wifi === false) {
            eaterySelection.innerHTML += `
            <strong>Wifi:</strong> &#x1F44E;
            <br>
            `
        }
        eaterySelection.innerHTML += `
        <strong>Description:</strong> ${selectedEatery.description}
        `
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