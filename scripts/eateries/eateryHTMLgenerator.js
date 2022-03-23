export const makeEateriesDropdown = (objArray) => {
    let eateriesBlock = ''
    for (let object of objArray) {
        eateriesBlock += `
            <option id="attraction--${object.id}" value="${object.state}">${object.businessName}</option>
            `
    }
    return eateriesBlock
}