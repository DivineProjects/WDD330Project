import { getLocalStorage, setLocalStorage } from "./utils.mjs";

/**
 * Update the watchList icon with the current number of items in the watchList.
 */
function cartItemTemplate(item) {
    const newItem = `
    <li class="cart-card divider">
        <a href="#" class="cart-card__image">
            <img src="${item.image}" alt="${item.symbol}"/>
        </a>
        <a href="#">
            <h2 class="card__name">${item.symbol}</h2>
        </a>
        <p class="cart-card__color">${item.changes}</p>
        <p class="cart-card__last-div">${item.lastDiv}</p>
        <p class="cart-card__price">$${item.price.toFixed(2)}</p>
        <span class="cart-card__remove-data" id="${item.symbol}">X</span>
    </li>`;
  
    return newItem;
}

  
  export function removeItemListener() {
    const cartContainer = document.querySelector("#cart-list");
    
    // event listener to remove item from cart
    cartContainer.addEventListener("click", (e) => {
      if (e.target.classList.contains("cart-card__remove-data")) {
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
    displayCartItems();
    // displayResults(cartItems)
    
  }


export function updateWatchListIcon(watchList) {
    const itemCountElement = document.querySelector('.item-count'); // Select the count element
    console.log(itemCountElement)
    const itemCount = watchList.length; // Get the number of items in the watchList

    // Update the watchList item count display
    if (itemCount > 0) {
        itemCountElement.style.display = "flex"; // Show the count bubble
        itemCountElement.textContent = itemCount; // Set the count text
        
    } else {
        itemCountElement.textContent = ""; // Clear count if watchList is empty
        itemCountElement.style.display = "none"; // Hide the count bubble

    }
}



// Function to display cart items
export function displayCartItems() {
    const cart = getLocalStorage("watch-list");

    displayResults(cart);
}
// Call this function to display the cart items when the page loads

function displayResults() {
    const results = getLocalStorage("watch-list"); // Retrieve cart items from local storage

    const resultsContainer = document.querySelector('#cart-list');
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
