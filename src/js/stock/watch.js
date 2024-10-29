import {  loadHeaderFooter} from "./utils.mjs";
import {displayCartItems, removeItemListener} from "./watchList.mjs";

loadHeaderFooter();
// Call this function to display the cart items when the page loads
document.addEventListener("DOMContentLoaded", () => {
    displayCartItems(); // Call the function after the DOM is fully loaded
    removeItemListener();
});
