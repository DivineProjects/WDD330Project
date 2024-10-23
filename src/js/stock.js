import { getParam } from "./utilsStock.mjs";
import { setLocalStorage } from "./utils.mjs";
import StockData from "./StockData.mjs";
import StockDetails from "./StockDetails.mjs";

const dataSource = new StockData("stock");
const symbol = getParam("symbol");
// console.log(symbol);
// console.log(dataSource.findStockBySymbol(symbol));

const stock = new StockDetails(symbol, dataSource);
stock.init();

// function addToCart(product) {
//   setLocalStorage("so-cart", product);
// }
// // add to cart button event handler
// async function addToCartHandler(e) {
//   const product = await dataSource.findStockBySymbol(e.target.dataset.id);
//   addToCart(product);
// }

// // add listener to Add to Cart button
// document
//   .getElementById("addToCart")
//   .addEventListener("click", addToCartHandler);
