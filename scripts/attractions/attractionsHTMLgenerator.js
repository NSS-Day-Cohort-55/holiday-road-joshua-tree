export const makeAttractionsDropdown = (objArray) => {
    let attractionsBlock = ''
    for (let object of objArray) {
        attractionsBlock += `
            <option id="attraction--${object.id}" value="${object.state}">${object.name}</option>
            `
    }
    return attractionsBlock
}