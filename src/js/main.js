/* moment 2 - Frontend-baserad utveckling DT211G
Av Ramona Reinholdz, rare2400 */

//hämta data när sidan laddas
window.onload = () => {
    getData();
}

//array för att lagra kurser
let courses = [];

//funktion för att hämta och visa data från API
async function getData() {
    try {
        const response = await fetch('https://webbutveckling.miun.se/files/ramschema_ht24.json');
        if (!response.ok) {
            throw new Error('Fel vid hämtning av data');
        }
        courses = await response.json();
        printCourses(courses);

    } catch (error) {
        console.error('Error:', error);
        document.querySelector('#error').textContent = 'Fel vid anslutning - prova igen senare';
    }
}

function printCourses(data) {
    const tableEl = document.querySelector('#course-table');
    //töm tabellen
    tableEl.innerHTML = "";

    //skriv ut data i tabellen
    data.forEach(course => {
        tableEl.innerHTML += `<tr>
        <td>${course.code}</td>
        <td>${course.coursename}</td>
        <td>${course.progression}</td>
        </tr>`;
    });
}
