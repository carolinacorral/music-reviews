// Fetch data from the API and populate the home page
async function fetchData() {
    const apiUrl = 'https://9nncwnbbqk.execute-api.us-east-2.amazonaws.com/dev/getSheetData';

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        const rows = data.database; // Access the database tab
        populateLatestEntries(rows);
        populateFavorites(rows);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}



function populateLatestEntries(rows) {
    const sortedRows = rows
    .filter(row => row[7]) // Date row
    .sort((a, b) => new Date(b[7]) - new Date(a[7])); // Compare dates in descending order

    const latestEntries = sortedRows.slice(0, 4); // Get the top 4 entries
    const container = document.querySelector('.entries-container');

    latestEntries.forEach(row => {
        const entry = createEntry(row);
        container.appendChild(entry);
    });
}

function populateFavorites(rows) {
    const favoriteRows = rows.filter(row => row[8] === '1'); // Filter by favorite = 1
    const container = document.querySelector('.favorites-container');

    favoriteRows.forEach(row => {
        const favorite = createEntry(row);
        container.appendChild(favorite);
    });
}

function createEntry(row) {
    const entryDiv = document.createElement('div');
    entryDiv.classList.add('entry');

    const image = document.createElement('img');
    image.src = row[9]; // image_url
    image.alt = row[1]; // album name

    const infoDiv = document.createElement('div');
    infoDiv.classList.add('album-info');

    const title = document.createElement('span');
    title.textContent = `${row[1]} (${row[3]})`; // album name (year)

    const artistOrigin = document.createElement('span');
    artistOrigin.textContent = `${row[2]} (${row[5]})`; // album artist (origin)

    infoDiv.appendChild(title);
    infoDiv.appendChild(artistOrigin);

    entryDiv.appendChild(image);
    entryDiv.appendChild(infoDiv);

    return entryDiv;
}

// Initialize the page
fetchData();
