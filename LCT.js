document.addEventListener("DOMContentLoaded", () => {
    const calorieForm = document.getElementById("calorie-form");
    const foodNameInput = document.getElementById("food-name");
    const caloriesInput = document.getElementById("calories");
    const calorieList = document.getElementById("calorie-list");
    const totalCaloriesDisplay = document.getElementById("total-calories");

    let totalCalories = 0;
    let foodItems = JSON.parse(localStorage.getItem("calorieData")) || [];

    // Function to update UI and local storage
    function updateCalorieList() {
        calorieList.innerHTML = "";
        totalCalories = 0;

        foodItems.forEach((item, index) => {
            totalCalories += item.calories;

            const listItem = document.createElement("li");
            listItem.innerHTML = `${item.food} - ${item.calories} kcal 
                <button class="delete-btn" data-index="${index}">❌</button>`;

            calorieList.appendChild(listItem);
        });

        totalCaloriesDisplay.textContent = totalCalories;
        localStorage.setItem("calorieData", JSON.stringify(foodItems));
    }

    // Load saved data on page load
    updateCalorieList();

    // Function to add a new food item
    calorieForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const foodName = foodNameInput.value.trim();
        const calories = parseInt(caloriesInput.value.trim());

        if (foodName === "" || isNaN(calories) || calories <= 0) {
            alert("Please enter a valid food name and calorie amount.");
            return;
        }

        // Add item to the array and update storage
        foodItems.push({ food: foodName, calories: calories });
        updateCalorieList();

        // Clear input fields
        foodNameInput.value = "";
        caloriesInput.value = "";
    });

    // Delete item
    calorieList.addEventListener("click", (event) => {
        if (event.target.classList.contains("delete-btn")) {
            const index = event.target.getAttribute("data-index");
            foodItems.splice(index, 1);
            updateCalorieList();
        }
    });
});
