document.addEventListener("DOMContentLoaded", function() {
    const dropdown = document.querySelector(".dropdown");

    dropdown.addEventListener("mouseenter", function() {
        dropdown.querySelector(".dropdown-content").style.display = "block";
    });

    dropdown.addEventListener("mouseleave", function() {
        dropdown.querySelector(".dropdown-content").style.display = "none";
    });
});