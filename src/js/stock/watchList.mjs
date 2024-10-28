import { getLocalStorage } from "./utils.mjs";

/**
 * Update the watchList icon with the current number of items in the watchList.
 */
export function updateWatchListIcon(watchList) {
    const itemCountElement = document.getElementById('cart-item-count'); // Select the count element
    const itemCount = watchList.length; // Get the number of items in the watchList

    // Update the watchList item count display
    if (itemCount > 0) {
        itemCountElement.textContent = itemCount; // Set the count text
        itemCountElement.style.display = "flex"; // Show the count bubble

    } else {
        itemCountElement.textContent = ""; // Clear count if watchList is empty
        itemCountElement.style.display = none; // Show the count bubble

    }
}

// Function to display cart items
export function displayCartItems() {
    const cart = getLocalStorage();
    const cartListElement = document.getElementById('cart-list'); // Get the cart list element

    // Clear the current cart display
    cartListElement.innerHTML = '';

    // Check if the cart is empty
    if (cart.length === 0) {
        cartListElement.innerHTML = '<li>Your cart is empty.</li>'; // Display empty message
        return;
    }

    // Loop through each item in the cart and create a list item
    cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.Name} - $${item.Price.toFixed(2)}`; // Adjust based on your item properties
        cartListElement.appendChild(listItem); // Append the item to the list
    });

    // Update cart icon (if needed)
    updateCartIcon(cart);
}