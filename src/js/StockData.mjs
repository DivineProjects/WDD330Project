function convertToJson(res) {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Bad Response");
    }
  }
  
  export default class StockData {
    constructor(category) {
      this.category = category;
      this.path = `../json/${this.category}.json`;
    }
    getData() {
      return fetch(this.path)
        .then(convertToJson)
        .then((data) => data);
    }
    async findStockBySymbol(symbol) {
      const stocks = await this.getData();
      return stocks.find((item) => item.symbol === symbol);
    }
  }
  