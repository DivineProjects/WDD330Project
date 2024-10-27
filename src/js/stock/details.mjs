import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

// Get the stock symbol from the URL query parameters
const urlParams = new URLSearchParams(window.location.search);
const symbol = urlParams.get('symbol');

if (symbol) {
    const apiKey = 'GwNt7m8crW2zslDR2dfLoppujRi22PWa'; // Replace with your actual API key
    fetch(`https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=${apiKey}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayCompanyProfile(data);
        })
        .catch(error => {
            console.error('Error fetching company data:', error);
            document.querySelector('.company-profile').innerHTML = '<p>Error loading company profile. Please try again later.</p>';
        });
} else {
    document.querySelector('.company-profile').innerHTML = '<p>No symbol provided.</p>';
}

function displayCompanyProfile(data) {
    const profileContainer = document.querySelector('.company-profile');
    profileContainer.innerHTML = ''; // Clear any existing content

    if (data.length === 0) {
        profileContainer.innerHTML = '<p>No profile data found.</p>';
        return;
    }

    const company = data[0]; // Get the first (and usually only) profile

    profileContainer.innerHTML = `
        <div class="company-info">
            <div class = "ticker">
                <img src="${company.image}" alt="${company.companyName} logo" class="company-logo">
                <h2>${company.companyName} (${company.symbol})</h2>
            </div>
            <div class="summary">
                <h4>Summary</h4>
                <p><strong>Market Cap:</strong> $${(company.mktCap / 1e9).toFixed(2)} Billion</p>
                <p><strong>Current Price:</strong> $${company.price}</p>
                <p><strong>Beta:</strong> ${company.beta}</p>
                <p><strong>Average Volume:</strong> ${company.volAvg.toLocaleString()}</p>
                <p><strong>Last Dividend:</strong> $${company.lastDiv}</p>
                <p><strong>CEO:</strong> ${company.ceo}</p>
                <p><strong>Website:</strong> <a href="${company.website}" target="_blank">${company.website}</a></p>
                <a href="analysis.html?symbol=${company.symbol}" class="investigate-link">Investigate Financials</a>
            </div> 
            <p><strong>Description:</strong> ${company.description}</p>
        </div>
    `;
}