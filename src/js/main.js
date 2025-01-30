/* moment 2 - Frontend-baserad utveckling DT211G
Av Ramona Reinholdz, rare2400 */

window.onload = () => {
    getData();
}

let courses = [];
let courseCode = [];
let progression = [];

//funktion för att hämta och visa data från API
async function getData() {
    try {
        const response = await fetch('https://webbutveckling.miun.se/files/ramschema_ht24.json');
        const data = await response.json();
        console.table(data);
    } catch (error) {
        console.error('Error:', error);
    }
}

