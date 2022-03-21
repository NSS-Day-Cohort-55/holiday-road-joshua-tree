export const makeStatesDropdown = (objArray) => {
    let statesBlock = ''
    for (let object of objArray) {
        statesBlock += `
            <option value="${object.name}">${object.name}</option>
            `
    }
    return statesBlock
}