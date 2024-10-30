import { getLocalStorage, setLocalStorage, alertMessage, updateWatchListCount } from "./utils.mjs";

function cartItemTemplate(item) {
    const newItem = `<div class="stock-card">
        <img src="${item.image}" alt="${item.symbol}" class="stock-image"/>
        <div class="stock-details">
            <p class="stock-name">${item.symbol }</p>
            <div class="price-dividend">
                <p class="stock-price">Price: $${item.price}</p>
                <p class="stock-dividend">Change: ${item.changes}</p>
            </div>
            <div class="actions">
                <a href="../stock/details.html?symbol=${item.symbol}" class="view-link">View</a>
                <a href="#" class="delete-link" id="${item.symbol}">Delete</a>
            </div>
        </div>
    </div>`
      return newItem;
}

  export function removeItemListener() {
    const cartContainer = document.querySelector("#watch-list");
    
    // event listener to remove item from cart
    cartContainer.addEventListener("click", (e) => {
      if (e.target.classList.contains("delete-link")) {
        const itemId = e.target.id;
        removeItem(itemId);
      }
      
    });
   
  }
  
  function removeItem(itemId) {
    let cartItems = getLocalStorage("watch-list");
    cartItems = cartItems.filter((item) => item.symbol !== itemId);
    // update local storage
    setLocalStorage("watch-list", cartItems);
    // re-render the cart
    displayWatchList();
    alertMessage(`Stock Removed added to Watch List`, true); 
    updateWatchListCount();
    // displayResults(cartItems)
    
  }


// Function to display watchlist
export function displayWatchList() {
    const cart = getLocalStorage("watch-list");

    displayResults(cart);
}

// displays the watchlist items when the page loads
function displayResults() {
    const results = getLocalStorage("watch-list"); 
   
    const resultsContainer = document.querySelector('#watch-list');
    resultsContainer.innerHTML = ''; // Clear previous results

    if (results.length === 0) {
        resultsContainer.innerHTML = '<p>No results found.</p>';
        return;
    }

    results.forEach(item => {
        const cartItemHTML = cartItemTemplate(item);
        resultsContainer.insertAdjacentHTML('beforeend', cartItemHTML);
    });
}


