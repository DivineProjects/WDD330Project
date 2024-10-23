import { searchStocks } from './api.js'; // Assume this function fetches stock data.

document.getElementById('search-button').addEventListener('click', () => {
    const query = document.getElementById('search-input').value;
    displayResults(query);
});

function displayResults(query) {
    const resultsContainer = document.querySelector('.search-results');
    resultsContainer.innerHTML = ''; // Clear previous results

    // Simulating stock search result for demo purpose
    const dummyData = [
        { ticker: 'AAPL', price: 145.09, change: '+1.21%' },
        { ticker: 'GOOGL', price: 2725.60, change: '+0.85%' },
    ];

    const filteredResults = dummyData.filter(stock => stock.ticker.toLowerCase().includes(query.toLowerCase()));

    filteredResults.forEach(stock => {
        const card = document.createElement('div');
        card.className = 'review-card';
        card.innerHTML = `
            <h2>${stock.ticker}</h2>
            <p>Price: $${stock.price}</p>
            <p>Change: ${stock.change}</p>
        `;
        resultsContainer.appendChild(card);
    });
}
