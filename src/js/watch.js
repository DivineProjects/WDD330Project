import {  loadHeaderFooter} from "./utils.mjs";
import {displayWatchList, removeItemListener, updateWatchListIcon} from "./watchListData.mjs";

loadHeaderFooter();
// Call this function to display the cart items when the page loads
document.addEventListener("DOMContentLoaded", () => {
    displayWatchList(); // Call the function after the DOM is fully loaded
    removeItemListener();
});
