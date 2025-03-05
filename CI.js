document.getElementById('nutrition-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const foodItem = document.getElementById('food-input').value;
    const apiKey = 'e2c44aa1f734fe115859c616e0d17fc9';  // Replace with your actual API key
    const appId = '39feaa5c';   // Replace with your actual App ID
    const url = `https://api.edamam.com/api/nutrition-data?app_id=${appId}&app_key=${apiKey}&ingr=${foodItem}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.totalNutrients) {
                document.getElementById('nutrition-results').innerHTML = `
                    <p><strong>Calories:</strong> ${data.calories} kcal</p>
                    <p><strong>Protein:</strong> ${data.totalNutrients.PROCNT ? data.totalNutrients.PROCNT.quantity.toFixed(2) : 0} g</p>
                    <p><strong>Fiber:</strong> ${data.totalNutrients.FIBTG ? data.totalNutrients.FIBTG.quantity.toFixed(2) : 0} g</p>
                    <p><strong>Fat:</strong> ${data.totalNutrients.FAT ? data.totalNutrients.FAT.quantity.toFixed(2) : 0} g</p>
                    <p><strong>Carbs:</strong> ${data.totalNutrients.CHOCDF ? data.totalNutrients.CHOCDF.quantity.toFixed(2) : 0} g</p>
                    <p><strong>Vitamins:</strong> 
                        Vitamin A: ${data.totalNutrients.VITA_RAE ? data.totalNutrients.VITA_RAE.quantity.toFixed(2) : 0} µg,
                        Vitamin C: ${data.totalNutrients.VITC ? data.totalNutrients.VITC.quantity.toFixed(2) : 0} mg
                    </p>
                    <p><strong>Minerals:</strong> 
                        Iron: ${data.totalNutrients.FE ? data.totalNutrients.FE.quantity.toFixed(2) : 0} mg,
                        Calcium: ${data.totalNutrients.CA ? data.totalNutrients.CA.quantity.toFixed(2) : 0} mg
                    </p>
                `;
            } else {
                document.getElementById('nutrition-results').innerHTML = "<p>No data available for this item.</p>";
            }
        })
        .catch(error => console.log('Error:', error));

    document.getElementById('food-input').value = '';
});
