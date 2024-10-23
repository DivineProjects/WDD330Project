function convertToJson(res) {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Bad Response");
    }
  }

function stockDetailsTemplate(stock) {
  return `<section class="product-detail"> <h3>${stock.symbol}</h3>
    <h2 class="divider">${stock.companyName}</h2>
    <img
      class="divider"
      src="${stock.Image}"
      alt="${stock.companyName}"
    />
    <p class="product-card__price">$${stock.price}</p>
    <p class="product__color">$${stock.mktCap}</p>
    <p class="product__description">
    ${stock.description}
    </p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${stock.symbol}">Add to Cart</button>
    </div></section>`;
}

export default class StockDetails {
  constructor(symbol, dataSource){
      this.symbol = symbol;
      this.stock = {};
      this.dataSource = dataSource;
  }
  async init() {
      // use our datasource to get the details for the current stock. findstockById will return a promise! use await or .then() to process it
      this.stock = await this.dataSource.findStockBySymbol(this.symbol);
      // once we have the stock details we can render out the HTML
      this.renderStockDetails("main");
      // once the HTML is rendered we can add a listener to Add to Cart button
      // Notice the .bind(this). Our callback will not work if we don't include that line. Review the readings from this week on 'this' to understand why.
      document
        .getElementById("addToCart")
        .addEventListener("click", this.addToCart.bind(this));
  }
  
  addToCart(stock) {
      setLocalStorage("so-cart", stock);
  }
  
  renderStockDetails(selector) {
      const element = document.querySelector(selector);
      element.insertAdjacentHTML(
        "afterBegin",
        stockDetailsTemplate(this.stock)
      );
    }
}
