
import {fetchStock} from "./externalServices.mjs";

export function searchApi() {
    document.getElementById('search-button').addEventListener('click', async () => {
        const query = document.getElementById('search-input').value;
    
        if (query) {
            try {
                const data = await fetchStock(query,"search");
                displayResults(data);
            } catch (error) {
                console.error('Error fetching data:', error);
                alert('Error fetching data. Please try again later.');
            }
        } else {
            alert('Please enter a stock symbol to search.');
        }
    });
}

function displayResults(results) {
    console.log(results);
    const resultsContainer = document.querySelector('.search-results');
    resultsContainer.innerHTML = ''; // Clear previous results

    if (results.length === 0) {
        resultsContainer.innerHTML = '<p>No results found.</p>';
        return;
    }

    results.forEach(item => {
        const card = document.createElement('div');
        card.className = 'result-card';

        card.innerHTML = `
            <a href="details.html?symbol=${item.symbol}" class="card-link">
                <h3>${item.name} (${item.symbol})</h3>
                <p>${item.name} is listed on the ${item.stockExchange} (${item.exchangeShortName}). The exchange trades in ${item.currency}</p>
            </a>
        `;
        resultsContainer.appendChild(card);
    });
}

