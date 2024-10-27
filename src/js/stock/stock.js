import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();


document.getElementById('search-button').addEventListener('click', async () => {
    const query = document.getElementById('search-input').value;
    const apiKey = 'GwNt7m8crW2zslDR2dfLoppujRi22PWa'; // Replace with your actual API key

    if (query) {
        try {
            const response = await fetch(`https://financialmodelingprep.com/api/v3/search?query=${query}&apikey=${apiKey}`);
            const data = await response.json();
            displayResults(data);
        } catch (error) {
            console.error('Error fetching data:', error);
            alert('Error fetching data. Please try again later.');
        }
    } else {
        alert('Please enter a stock symbol to search.');
    }
});

function displayResults(results) {
    const resultsContainer = document.querySelector('.search-results');
    resultsContainer.innerHTML = ''; // Clear previous results

    if (results.length === 0) {
        resultsContainer.innerHTML = '<p>No results found.</p>';
        return;
    }

    results.forEach(item => {
        const card = document.createElement('div');
        card.className = 'result-card';

        // Make the entire card clickable by wrapping it in an <a> tag
        card.innerHTML = `
            <a href="details.html?symbol=${item.symbol}" class="card-link">
                <h3>${item.name} (${item.symbol})</h3>
                <p>Exchange: ${item.stockExchange} (${item.exchangeShortName}) Currency: ${item.currency}</p>
            </a>
        `;
        resultsContainer.appendChild(card);
    });
}

