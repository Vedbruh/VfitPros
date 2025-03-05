document.addEventListener("DOMContentLoaded", function() {
    loadProgress();
    generateGraph();
});

// Function to add a new row
function addRow() {
    let table = document.querySelector("#progression-table tbody");
    let row = document.createElement("tr");

    row.innerHTML = `
        <td><input type="text" class="exercise-name" placeholder="Enter Exercise"></td>
        <td>
            <select class="exercise-type">
                <option value="Machine">Machine</option>
                <option value="Dumbbell">Dumbbell</option>
                <option value="Cable">Cable</option>
                <option value="Barbell">Barbell</option>
            </select>
        </td>
        <td><input type="number" class="weight-input"></td>
        <td><input type="number" class="weight-input"></td>
        <td><input type="number" class="weight-input"></td>
        <td><input type="number" class="weight-input"></td>
        <td><button onclick="removeRow(this)">❌</button></td>
    `;

    table.appendChild(row);
}

// Function to remove a row
function removeRow(button) {
    button.parentElement.parentElement.remove();
}

// Save progress to local storage
function saveProgress() {
    let rows = document.querySelectorAll("#progression-table tbody tr");
    let data = [];

    rows.forEach(row => {
        let exercise = {
            name: row.querySelector(".exercise-name").value,
            type: row.querySelector(".exercise-type").value,
            week1: row.querySelectorAll(".weight-input")[0].value,
            week2: row.querySelectorAll(".weight-input")[1].value,
            week3: row.querySelectorAll(".weight-input")[2].value,
            week4: row.querySelectorAll(".weight-input")[3].value
        };
        data.push(exercise);
    });

    localStorage.setItem("strengthProgress", JSON.stringify(data));
    alert("Progress Saved!");
}

// Load progress from local storage
function loadProgress() {
    let savedData = localStorage.getItem("strengthProgress");
    if (savedData) {
        let data = JSON.parse(savedData);
        let table = document.querySelector("#progression-table tbody");
        table.innerHTML = "";

        data.forEach(exercise => {
            let row = document.createElement("tr");

            row.innerHTML = `
                <td><input type="text" class="exercise-name" value="${exercise.name}"></td>
                <td>
                    <select class="exercise-type">
                        <option value="Machine" ${exercise.type === "Machine" ? "selected" : ""}>Machine</option>
                        <option value="Dumbbell" ${exercise.type === "Dumbbell" ? "selected" : ""}>Dumbbell</option>
                        <option value="Cable" ${exercise.type === "Cable" ? "selected" : ""}>Cable</option>
                        <option value="Barbell" ${exercise.type === "Barbell" ? "selected" : ""}>Barbell</option>
                    </select>
                </td>
                <td><input type="number" class="weight-input" value="${exercise.week1}"></td>
                <td><input type="number" class="weight-input" value="${exercise.week2}"></td>
                <td><input type="number" class="weight-input" value="${exercise.week3}"></td>
                <td><input type="number" class="weight-input" value="${exercise.week4}"></td>
                <td><button onclick="removeRow(this)">❌</button></td>
            `;

            table.appendChild(row);
        });
    }
}

// Generate graph from saved data
function generateGraph() {
    let ctx = document.getElementById("progressChart").getContext("2d");
    let savedData = localStorage.getItem("strengthProgress");

    if (savedData) {
        let data = JSON.parse(savedData);
        let labels = data.map(ex => ex.name);
        let values = data.map(ex => parseFloat(ex.week4) || 0);

        if (window.myChart) {
            window.myChart.destroy();
        }

        window.myChart = new Chart(ctx, {
            type: "bar",
            data: {
                labels: labels,
                datasets: [{
                    label: "Week 4 Weights",
                    data: values,
                    backgroundColor: "red"
                }]
            }
        });
    }
}

// Clear graph data
function clearGraph() {
    if (window.myChart) {
        window.myChart.destroy();
    }
}

// Generate PDF
function downloadPDF() {
    const { jsPDF } = window.jspdf;
    let doc = new jsPDF();

    doc.text("Strength Progression Report", 20, 10);
    
    // Convert table to canvas and add to PDF
    html2canvas(document.querySelector("#progression-table")).then(canvas => {
        let imgData = canvas.toDataURL("image/png");
        doc.addImage(imgData, "PNG", 10, 20, 190, 0);
        
        // Convert graph to canvas and add to PDF
        html2canvas(document.querySelector("#progressChart")).then(graphCanvas => {
            let graphImgData = graphCanvas.toDataURL("image/png");
            doc.addPage();
            doc.text("Progress Analytics", 20, 10);
            doc.addImage(graphImgData, "PNG", 10, 20, 190, 0);
            doc.save("Strength_Progression.pdf");
        });
    });
}
