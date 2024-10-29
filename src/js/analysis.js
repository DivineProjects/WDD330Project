import { loadHeaderFooter } from "./utils.mjs";
import FetchData from "./analysisData.mjs";

loadHeaderFooter();

document.addEventListener("DOMContentLoaded", () => {
  // Get the stock symbol from the URL query parameters
  const urlParams = new URLSearchParams(window.location.search);
  const symbol = urlParams.get(symbol);
  const fetchData = new FetchData(symbol);
  fetchData.init();
});
