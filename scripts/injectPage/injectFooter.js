export const footer = () => {
    const footerElement = document.querySelector("footer")
    
    footerElement.innerHTML =  `
        <p>&copy; Who Is Joshua Tree LLC. ${new Date().getFullYear()}</p>
        `
}