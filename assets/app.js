document.addEventListener('DOMContentLoaded', () => {
    Promise.all([
        fetch('data/database.json').then(response => response.json()),
        fetch('data/reviews.json').then(response => response.json())
    ])
    .then(([database, reviews]) => {
        const reviewsContainer = document.getElementById('reviews-container');
        reviews.forEach(review => {
            const albumInfo = database.find(entry => entry.album_id === review.album_id);
            if (albumInfo) {
                const reviewElement = document.createElement('div');
                reviewElement.classList.add('review');
                reviewElement.innerHTML = `
                    <h2>${albumInfo.album} by ${albumInfo.artist}</h2>
                    <img src="${albumInfo.image_url}" alt="${albumInfo.album}">
                    <p>Year: ${albumInfo.year}</p>
                    <p>Genre: ${albumInfo.genre}</p>
                    <p>Rating: ${review.rating}</p>
                    <p>${review.review_text}</p>
                    <p>Date: ${new Date(review.review_date).toLocaleDateString()}</p>
                `;
                reviewsContainer.appendChild(reviewElement);
            }
        });
    })
    .catch(error => console.error('Error fetching data:', error));
});

document.addEventListener('DOMContentLoaded', () => {
    fetch('data/database.json')
        .then(response => response.json())
        .then(data => {
            const entriesContainer = document.getElementById('latest-entries');
            // Sort by log_date in descending order and slice the last 5 entries
            const latestEntries = data.sort((a, b) => new Date(b.log_date) - new Date(a.log_date)).slice(-5);
            
            latestEntries.forEach(entry => {
                const entryElement = document.createElement('div');
                entryElement.classList.add('entry');
                entryElement.innerHTML = `
                    <h2>${entry.album}</h2>
                    <p>Artist: ${entry.artist}</p>
                    <p>Year: ${entry.year}</p>
                    <p>Genre: ${entry.genre}</p>
                    <p>Log Date: ${new Date(entry.log_date).toLocaleDateString()}</p>
                `;
                entriesContainer.appendChild(entryElement);
            });
        })
        .catch(error => console.error('Error fetching database.json:', error));
});

