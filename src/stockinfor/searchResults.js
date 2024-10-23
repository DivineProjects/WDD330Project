// search-results.js

const simulatedResults = [
    {
        title: 'Apple Inc. (AAPL)',
        link: 'https://www.example.com/aapl',
        snippet: 'Apple Inc. is an American multinational technology company that specializes in consumer electronics, computer software, and online services.'
    },
    {
        title: 'Alphabet Inc. (GOOGL)',
        link: 'https://www.example.com/googl',
        snippet: 'Alphabet Inc. is a multinational conglomerate that is the parent company of Google and several other businesses.'
    },
    {
        title: 'Amazon.com, Inc. (AMZN)',
        link: 'https://www.example.com/amzn',
        snippet: 'Amazon is an American multinational technology company focusing on e-commerce, cloud computing, and artificial intelligence.'
    },
    {
        title: 'Microsoft Corporation (MSFT)',
        link: 'https://www.example.com/msft',
        snippet: 'Microsoft Corporation is an American multinational technology company that produces software, consumer electronics, and personal computers.'
    }
];

// Function to render search results
function renderResults(query) {
    const resultsContainer = document.getElementById('results');
    const searchQueryElement = document.getElementById('search-query');
    searchQueryElement.textContent = query;

    // Clear previous results
    resultsContainer.innerHTML = '';

    // Filter results based on the query
    const filteredResults = simulatedResults.filter(result => 
        result.title.toLowerCase().includes(query.toLowerCase())
    );

    // Render filtered results
    if (filteredResults.length > 0) {
        filteredResults.forEach(result => {
            const resultItem = document.createElement('div');
            resultItem.classList.add('result-item');
            resultItem.innerHTML = `
                <h3><a href="${result.link}" target="_blank">${result.title}</a></h3>
                <p>${result.snippet}</p>
            `;
            resultsContainer.appendChild(resultItem);
        });
    } else {
        resultsContainer.innerHTML = '<p>No results found.</p>';
    }
}

// Search button event listener
document.getElementById('search-button').addEventListener('click', () => {
    const query = document.getElementById('search-input').value.trim();
    if (query) {
        renderResults(query);
    }
});

// Optional: Handle Enter key in search input
document.getElementById('search-input').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        document.getElementById('search-button').click();
    }
});

// Load initial search query from URL parameters (if any)
const urlParams = new URLSearchParams(window.location.search);
const initialQuery = urlParams.get('query') || '';
document.getElementById('search-input').value = initialQuery;
renderResults(initialQuery);
