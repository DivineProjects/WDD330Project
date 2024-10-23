import StockData from "./stockData.mjs";
import StockList from "./StockList.mjs";

const dataSource = new StockData("AAPL");
const element = document.querySelector(".product-list");
const listing = new StockList("AAPL", dataSource, element);

listing.init();