import { getLocalStorage, setLocalStorage, alertMessage } from "./utils.mjs";
import {fetchStock} from "./externalServices.mjs";
import{updateWatchListIcon} from "./watchListData.mjs";

function companyProfileTemplate(data) {
    const profileContainer = document.querySelector('.company-profile');
    profileContainer.innerHTML = ''; // Clear any existing content

    if (data.length === 0) {
        profileContainer.innerHTML = '<p>No profile data found.</p>';
        return;
    }

    const company = data[0]; // Get the first profile

    profileContainer.innerHTML = `
        <div class="company-info">
            <div class = "ticker">
                <img src="${company.image}" alt="${company.companyName} logo" class="company-logo">
                <h2>${company.companyName} (${company.symbol})</h2>
            </div>
                <button class="btn-addToWAtch" id="addToCart" data-id="${company.symbol}">Add to Watch List</button>

            <div class="summary"> 
                <h4>Summary</h4>
                <p><strong>Market Cap:</strong> <span>$${(company.mktCap / 1e9).toFixed(2)} Billion</span></p>
                <p><strong>Current Price:</strong> <span>$${company.price}</span></p>
                <p><strong>Beta:</strong> <span>${company.beta}</span></p>
                <p><strong>Average Volume:</strong> <span>${company.volAvg.toLocaleString()}</span></p>
                <p><strong>Last Dividend:</strong> <span>$${company.lastDiv}</span></p>
                <p><strong>CEO:</strong> <span>${company.ceo}</span></p>
                <p><strong>Website:</strong> <span><a href="${company.website}" target="_blank">${company.website}</a></span></p>
                <a href="./analysis.html?symbol=${company.symbol}" class="investigate-link">Investigate Financials</a>
            </div>
            <p><strong>Description:</strong> ${company.description}</p>
            <div class="product-detail__add">
            </div>
        </div>
    `;
}

export class FetchData {
    constructor(symbol) {
        this.symbol = symbol;
        this.stock = {};
    }
    async init() {
        
        if (this.symbol) {
            try {
                const data = await fetchStock(this.symbol,"profile");
                this.stock = data[0];
                companyProfileTemplate(data);
            } catch (error) {
                document.querySelector('.company-profile').innerHTML = '<p>Error loading company profile. Please try again later.</p>';
            }
        } else {
            document.querySelector('.company-profile').innerHTML = '<p>No symbol provided.</p>';
        }
        document.getElementById("addToCart").addEventListener("click", this.addToCart.bind(this));
    }

    addToCart() {
        const cart = getLocalStorage("watch-list") || [];    
        // retrieve current watchlist info from local storage
        const exists = cart.some(stock => stock.symbol === this.symbol);  // check if the product is already in the watchlist

        // if the product isn't already in the watchlist, add it, otherwise do nothing
        if (!exists) {
            // add new item to the watchlist
            cart.push(this.stock);
            // update local storage with complete watchlist
            setLocalStorage("watch-list", cart);
            // updateWatchListIcon(cart);
            cartAnimate();
            // put an alert message when the product is added to the watchlist
            alertMessage(`${this.stock.symbol} has been added to Watch List`, true); 
        }

    }
}

// Animate cart 
function cartAnimate() {
    const cartLink = document.querySelector(".cart a");
    // Trigger animation
    cartLink.classList.add('active');
    // Remove the active class after the animation completes
    setTimeout(() => {
        cartLink.classList.remove('active');
      }, 600); 
}

