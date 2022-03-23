export const makeParksDropdown = (objArray) => {
    let parksBlock = `
        <label for="parks" class="parks--dropdown">Choose a park</label> <br>
            <select name="parks" id="parks--select" class="parks--dropdown">
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
