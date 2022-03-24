export const saveTrip = (tripObject) => {
    return `<div class="saved--trip">
        <ul>
            <li style="margin-bottom: .3em"><b>Park:</b> ${tripObject.park.fullName}</li>
            <li style="margin-bottom: .3em"><b>Attraction:</b> ${tripObject.attraction.name}</li>
            <li style="margin-bottom: .3em"><b>Eatery:</b> ${tripObject.eatery.businessName}</li>
        </ul>

    </div>`
}   