import { loadHeaderFooter } from "./utilsStock.mjs";
import StockData from "./StockData.mjs";
import StockList from "./StockList.mjs";

loadHeaderFooter();

const dataSource = new StockData("AAPL");
const element = document.querySelector(".product-list");
const listing = new StockList("AAPL", dataSource, element);

listing.init();