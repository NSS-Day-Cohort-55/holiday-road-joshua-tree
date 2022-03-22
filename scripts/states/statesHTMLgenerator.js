export const makeStatesDropdown = (objArray) => {
    let statesBlock = ''
    for (let object of objArray) {
        statesBlock += `
            <option class="selected--state" id= "${object.name}" value="${object.abbreviation}">${object.name}</option>
            `
    }
    return statesBlock
}