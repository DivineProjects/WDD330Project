function convertToJson(res) {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Bad Response");
    }
  }
  
  // export default class StockData {
  //   constructor(category) {
  //     this.category = category;
  //     this.path = `../json/${this.category}.json`;
  //   }
  //   getData() {
  //     return fetch(this.path)
  //       .then(convertToJson)
  //       .then((data) => data);
  //   }
  //   async findStockBySymbol(symbol) {
  //     const stocks = await this.getData();
  //     return stocks.find((item) => item.symbol === symbol);
  //   }
  // }
 /// my own thing



  export default class SearchCompanyProfile{
    constructor(ticker){
      this.ticker = ticker;
      this.path = `https://financialmodelingprep.com/api/v3/profile/AAPL?apikey=GwNt7m8crW2zslDR2dfLoppujRi22PWa`

    }

    getData(){
      fetch("https://financialmodelingprep.com/api/v3/profile/AAPL?apikey=GwNt7m8crW2zslDR2dfLoppujRi22PWa")
  .then(convertToJson)
  .then(data => console.log(data));
    }

    async findStockBySymbol() {
      const stocks = await this.getData();
      return stocks.find((item) => item.symbol === symbol);
    }
    
  }
async function getData(){
  fetch("https://financialmodelingprep.com/api/v3/profile/AAPL?apikey=GwNt7m8crW2zslDR2dfLoppujRi22PWa")
  .then(convertToJson)
  .then(data => console.log(data));
}

  
async function getText(file) {
  let myObject = await fetch(file);
  let myText = await myObject.text();
  console.log(myText);
  return myText;
}
  