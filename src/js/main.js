/* moment 2 - Frontend-baserad utveckling DT211G
Av Ramona Reinholdz, rare2400 */

//hämta data när sidan laddas
window.onload = () => {
    getData();

    //händelsehanterare för filtrering
    document.querySelector('#search').addEventListener('input', filterData);
    /*händelsehanterare för sortering av kurskod, kursnamn och progression.
    Anropar funktionen för sortering av kurser med respektive nyckel. */
    document.querySelector("#sort-code").addEventListener("click", () => {
        sortCourses("code");
    });
    document.querySelector("#sort-name").addEventListener("click", () => {
        sortCourses("coursename");
    });
    document.querySelector("#sort-progr").addEventListener("click", () => {
        sortCourses("progression");
    });
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

//funktion för att skriva ut kurser i tabell
function printCourses(data) {
    const tableEl = document.querySelector('#course-table');
    //töm tabellen
    tableEl.innerHTML = "";

    //skriv ut data i tabellen
    data.forEach(course => {
        tableEl.innerHTML += `<tr>
        <td>${course.code}</td>
        <td>${course.coursename}</td>
        <td id="progr">${course.progression}</td>
        </tr>`;
    });
}

//funktion för att filtrera kurser
function filterData() {
    const searchInput = document.querySelector('#search').value;

    //filtrering av kurser och kurskoder
    const filteredData = courses.filter(course => {
        return course.coursename.toLowerCase().includes(searchInput.toLowerCase()) ||
            course.code.toLowerCase().includes(searchInput)
    });
    printCourses(filteredData);
}

//variabel för att hålla koll på ordningen för sortering
let sortOrder = "aToZ";

//funktion för att sortera kurser
function sortCourses(key) {
    courses.sort((a, b) => {
        //konverterar till gemener för att sortera oavsett storlek på bokstäver
        let valueA = a[key].toLowerCase();
        let valueB = b[key].toLowerCase();
        
        if (sortOrder === "aToZ") {
            // Stigande ordning (A-Z)
            return valueA > valueB ? 1 : -1;
        } else {
            // Fallande ordning (Z-A)
            return valueA < valueB ? 1 : -1;
        }
    });

    //ändra ordning för nästa sortering
    sortOrder = sortOrder === "aToZ" ? "zToA" : "aToZ";
    //skriv ut kurserna i tabellen
    printCourses(courses);
}