// app-reviews.js
async function fetchReviews() {
    const apiUrl = 'https://9nncwnbbqk.execute-api.us-east-2.amazonaws.com/dev/getSheetData';

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        //console.log('API Data:', data);
        const reviews = data.reviews; // Access the reviews tab
        const albums = data.database; // Access the database tab for album details
        //console.log("Reviews Data:", reviews);
        //console.log("Albums Data:", albums);
        populateReviews(reviews, albums);
    } catch (error) {
        console.error('Error fetching reviews:', error);
    }
}

function populateReviews(reviews, albums) {
    const reviewsContainer = document.querySelector('.reviews-container');

    // Sort reviews by the most recent date first
    const sortedReviews = reviews
        .filter(review => review[2]) // Assume column 2 contains the date; adjust index if needed
        .sort((a, b) => new Date(b[2]) - new Date(a[2])); // Compare dates in descending order

    sortedReviews.forEach(review => {
        const album = albums.find(a => a[0] === review[1].toString()); // Match album_id
        if (album) {
            const reviewElement = createReviewElement(review, album);
            reviewsContainer.appendChild(reviewElement);
        }
    });
}


function createReviewElement(review, album) {
    const reviewDiv = document.createElement('div');
    reviewDiv.classList.add('review');

    // Album image on the left
    const image = document.createElement('img');
    image.src = album[9]; // Image URL from the database
    image.alt = album[1]; // Album name
    reviewDiv.appendChild(image);

    // Content on the right
    const contentDiv = document.createElement('div');
    contentDiv.classList.add('review-content');

    // Title: Album name by Artist
    const reviewTitle = document.createElement('h4');
    reviewTitle.textContent = `${album[1]} by ${album[2]}`;
    contentDiv.appendChild(reviewTitle);

    // Rating
    const rating = document.createElement('p');
    rating.textContent = `${'⭐'.repeat(review[4])}`; // Stars for rating
    contentDiv.appendChild(rating);

    // Review text
    const reviewText = document.createElement('p');
    reviewText.textContent = review[3]; // Review text
    contentDiv.appendChild(reviewText);

    // Review date
    const reviewDate = document.createElement('p');
    reviewDate.textContent = `${review[2]}`;
    reviewDate.style.color = '#bbb'; // Lighter color for the date
    contentDiv.appendChild(reviewDate);

    // Append the content div to the review div
    reviewDiv.appendChild(contentDiv);

    return reviewDiv;
}


// Initialize reviews page
fetchReviews();
