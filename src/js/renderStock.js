import { loadHeaderFooter } from "./utils.mjs";
import { FetchData } from "./details.mjs";

loadHeaderFooter();

document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const symbol = urlParams.get('symbol');
    const stock = new FetchData(symbol);
    stock.init();
});
