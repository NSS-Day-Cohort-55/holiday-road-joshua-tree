export const makeParksDropdown = (objArray) => {
    let parksBlock = `
        <label for="parks" class="parks--dropdown">Choose a park</label>
        <br>
        <select name="parks" id="parks--select" class="parks--dropdown">
        <option hidden disabled selected value> -- select an option -- </option>
    `
    for (let object of objArray) {
        parksBlock += `
        <option class="park--input" value="${object.fullName}">${object.fullName}</option>
        `
    }
    parksBlock+= `
        </select>
           
    `
    return parksBlock
}
