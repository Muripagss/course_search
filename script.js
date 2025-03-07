
document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", function () {
            navMenu.classList.toggle("active");
        });
    }

    const searchBar = document.getElementById("search-bar");
    const courseTableBody = document.getElementById("course-table-body");

    let courses = [];

    fetch("https://muripagss.github.io/json/courses.json")
        .then(response => response.json())
        .then(data => {
            courses = data.courses;
            displayCourses(courses);
        })
        .catch(error => console.error("Error loading courses:", error));

    function displayCourses(filteredCourses, highlightText = "") {
        courseTableBody.innerHTML = "";
        filteredCourses.forEach(course => {
            let row = document.createElement("tr");
            row.innerHTML = `
                <td>${course.year_level}</td>
                <td>${course.sem}</td>
                <td>${course.code}</td>
                <td>${highlightMatch(course.description, highlightText)}</td> <!-- Highlight only in description -->
                <td>${course.credit}</td>
            `;
            courseTableBody.appendChild(row);
        });
    }
        

    function highlightMatch(text, searchText) {
        if (!searchText) return text;
        const regex = new RegExp(`(${searchText})`, "gi");
        return text.replace(regex, '<span class="highlight">$1</span>');
    }

    searchBar.addEventListener("input", function () {
        const searchText = searchBar.value.toLowerCase();
        const filteredCourses = courses.filter(course =>
            course.description.toLowerCase().includes(searchText) // Only filter by description
        );
        displayCourses(filteredCourses, searchText);
    });
});
