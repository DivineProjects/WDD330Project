import { loadHeaderFooter } from "./utils.mjs";
import { searchApi } from "./stockSearchData.mjs";

loadHeaderFooter();

document.addEventListener("DOMContentLoaded", () => {
  searchApi();
});
