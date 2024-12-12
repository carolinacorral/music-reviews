// Populate Full Data Table
function populateFullDataTable(rows) {
    const tableBody = document.querySelector('#data-table tbody');
    tableBody.innerHTML = ''; // Clear existing rows

    rows.forEach(row => {
        const tableRow = document.createElement('tr');

        row.forEach((cell, index) => {
            const tableCell = document.createElement('td');
            if (index === 9) { // Image column
                const img = document.createElement('img');
                img.src = cell || 'assets/placeholder.png'; // Fallback image
                img.alt = row[1]; // Album name
                img.style.width = '50px';
                img.style.height = '50px';
                tableCell.appendChild(img);
            } else {
                tableCell.textContent = cell || '-'; // Default to '-' if empty
            }
            tableRow.appendChild(tableCell);
        });

        tableBody.appendChild(tableRow);
    });
}

// Search Functionality for Full Data Table
function setupSearch(rows) {
    const searchBar = document.querySelector('#search-bar');

    searchBar.addEventListener('input', () => {
        const query = searchBar.value.toLowerCase();
        const filteredRows = rows.filter(row =>
            row.some(cell => (cell || '').toLowerCase().includes(query))
        );
        populateFullDataTable(filteredRows);
    });
}

// Fetch Data for Full Data Page
async function initializeFullDataPage() {
    const apiUrl = 'https://9nncwnbbqk.execute-api.us-east-2.amazonaws.com/dev/getSheetData';

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const rows = data.database; // Exclude headers

        populateFullDataTable(rows);
        setupSearch(rows);
    } catch (error) {
        console.error('Error fetching data for Full Data page:', error);
    }
}

// Initialize Full Data Page
initializeFullDataPage();
