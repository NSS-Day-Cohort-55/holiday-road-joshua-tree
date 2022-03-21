export const makeParksDropdown = (objArray) => {
    let parksBlock = `
    
    <label for="parks" class="parks--dropdown">Choose a park</label>
                    <select name="parks" id="parks--select" class="parks--dropdown">
                    `
                    for (let object of objArray) {
                        parksBlock += `
                        <option value="${object.fullName}">${object.fullName}</option>
                        `
                        console.log(object.fullName)
                    }
                   parksBlock+= `
                    </select>
           
            `
    return parksBlock
}