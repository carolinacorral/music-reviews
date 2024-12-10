document.addEventListener('DOMContentLoaded', () => {
    fetch('data/database.json')
        .then(response => response.json())
        .then(data => {
            const entriesContainer = document.getElementById('latest-entries');
            data.sort((a, b) => new Date(b.log_date) - new Date(a.log_date));  // Sort by log_date descending
            data.slice(0, 5).forEach(entry => {  // Display the latest 5 entries
                const entryElement = document.createElement('div');
                entryElement.classList.add('entry');
                entryElement.innerHTML = `
                    <h2>${entry.album}</h2>
                    <p>Artist: ${entry.artist}</p>
                    <p>Year: ${entry.year}</p>
                    <p>Genre: ${entry.genre}</p>
                `;
                entriesContainer.appendChild(entryElement);
            });
        })
        .catch(error => console.error('Error fetching database.json:', error));
});

