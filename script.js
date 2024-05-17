
// script.js
document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.querySelector("#statsTable tbody");

    function loadTableData(data) {
        tableBody.innerHTML = "";
        data.forEach(row => {
            let tr = document.createElement("tr");
            row.forEach(cell => {
                let td = document.createElement("td");
                td.textContent = cell;
                tr.appendChild(td);
            });
            tableBody.appendChild(tr);
        });
    }

    function searchStats() {
        const searchTerm = document.getElementById("searchBar").value.toLowerCase();
        const filteredData = statsData.filter(row => {
            return row.some(cell => cell.toString().toLowerCase().includes(searchTerm));
        });
        loadTableData(filteredData);
    }

    loadTableData(statsData);
    window.searchStats = searchStats;
});
