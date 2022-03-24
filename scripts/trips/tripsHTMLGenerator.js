export const saveTrip = (tripObject) => {
    return `<div class="saved--trip">
        <ul>
            <li ><u>Park:</u> ${tripObject.park.fullName}</li>
            <li ><u>Attraction:</u> ${tripObject.attraction.name}</li>
            <li ><u>Eatery:</u> ${tripObject.eatery.businessName}</li>
        </ul>

    </div>`
}   