export const saveTrip = (tripObject) => {
    return `<div class="saved--trip">
        <ul>
            <li>${tripObject.park.fullName}</li>
            <li>${tripObject.attraction.name}</li>
            <li>${tripObject.eatery.businessName}</li>
        </ul>

    </div>`
}