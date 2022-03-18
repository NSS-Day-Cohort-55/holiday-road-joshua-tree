export const footer = () => {
    const footerElement = document.querySelector("footer")
    
    footerElement.innerHTML =  `
        &copy; Who Is Joshua Tree LLC. ${new Date().getFullYear()}
        `
}